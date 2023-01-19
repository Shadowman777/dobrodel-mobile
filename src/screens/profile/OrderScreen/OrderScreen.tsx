import React from 'react';
import {useDispatch} from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntIcons from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {isTablet} from 'react-native-device-info';

import AppButton from 'components/app/AppButton/AppButton';
import AppLoading from 'components/app/AppLoading/AppLoading';
import OrderInfoMessage from './components/OrderInfoMessage/OrderInfoMessage';
import OrderEvaluationModal from './components/OrderEvaluationModal/OrderEvaluationModal';
import SearchProductItem from 'screens/shop/SearchScreen/components/SearchProductItem/SearchProductItem';
import OrderCancelModal from './components/OrderCancelModal/OrderCancelModal';

import {useAppSelector} from 'hooks/appHooks';
import {getOrderUrl} from 'store/slices/profileSlice/profileThunks';

import Car from 'assets/icons/car.svg';
import Location from 'assets/icons/location.svg';

import ProductService from 'services/shop/ProductService';
import OrdersService from 'services/profile/OrdersService';
import LinkingService from 'services/LinkingService';

import {
  declOfNum,
  formatDate,
  formatOrderDate,
  getCoordinates,
  getOrderDateTime,
  getTimePeriod,
} from 'utils/helpers';

import useHandleOrder from 'screens/profile/OrderScreen/hooks/useHandleOrder';

import DeliveryPointMarker from 'assets/icons/deliveryPoint.svg';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import orderStyles from '../OrdersScreen/styles';
import constants from 'assets/styles/constants';

MapboxGL.setAccessToken(Config.MAPBOX_TOKEN);

const OrderScreen = () => {
  const userCoordinates = useAppSelector(state => state.shop.userCoordinates);

  const orderHandleResult = useHandleOrder();
  const {
    order,
    showProducts,
    isCancelModalVisible,
    setCancelModalVisible,
    onCancelOrder,
  } = orderHandleResult;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  if (!order) {
    return null;
  }

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.orderWrapper}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {orderHandleResult.mainLoading ? (
        <AppLoading loading={orderHandleResult.mainLoading} />
      ) : (
        <View style={styles.orderContainer}>
          <View style={[styles.innerOrderContainer, {marginTop: -13}]}>
            <Text style={orderStyles.orderTitle}>Заказ №{order.order_id}</Text>
            <OrderInfoMessage
              status_info={order.status_info}
              status_info_type={order.status_info_type}
            />
            <View
              style={[
                appStyles.alignCenter,
                appStyles.justifyBetweenRow,
                orderStyles.orderItemInfoBlock,
              ]}>
              <Text style={orderStyles.orderText}>
                {formatOrderDate(order.date_create)} в{' '}
                {getOrderDateTime(order.date_create)}
              </Text>
              <View style={appStyles.alignCenterRow}>
                {OrdersService.checkWrongStatus(order.status) ? (
                  <AntIcons name="close" size={20} color="#e5243f" />
                ) : (
                  <AntIcons name="check" size={20} color="#0eb44d" />
                )}
                <Text
                  style={{
                    ...orderStyles.orderText,
                    color: !OrdersService.checkWrongStatus(order.status)
                      ? constants.colors.primaryText
                      : '#e5243f',
                  }}>
                  Заказ {order.status_text}
                </Text>
              </View>
            </View>
            <View
              style={[
                appStyles.alignCenter,
                appStyles.justifyBetweenRow,
                orderStyles.orderItemInfoBlock,
                {marginTop: 12},
              ]}>
              <Text style={orderStyles.orderText}>
                {order.products.length}{' '}
                {declOfNum(order.products.length, [
                  'позиция',
                  'позиции',
                  'позиций',
                ])}
              </Text>
              <Text style={styles.orderTitleText}>
                {ProductService.formatProductPrice(
                  order.total_amount.toString(),
                )}
                ₽
              </Text>
            </View>
            <View style={styles.orderPayButton}>
              <AppButton
                title="Связаться с нами"
                onPress={() => navigation.navigate('Feedback')}
                backgroundColor="#fff"
                borderColor="#007abc"
                buttonShadow
              />
            </View>
            {order && order.order_pay ? (
              <View style={[styles.orderPayButton, {marginTop: 12}]}>
                <AppButton
                  buttonShadow
                  title="Оплатить"
                  onPress={() => dispatch(getOrderUrl(order.order_id))}
                />
              </View>
            ) : null}
          </View>
          <View style={appStyles.appButtonShadow}>
            <AppButton
              title="В корзину"
              onPress={orderHandleResult.addOrderProductsToCart}
              loading={orderHandleResult.buttonLoading}
              buttonShadow
            />
          </View>
          <View style={styles.innerOrderContainer}>
            <Text style={styles.orderTitleSecondary}>Код заказа</Text>
            <Text style={styles.orderSubtitle}>
              Покажите этот код при получении заказа
            </Text>
            <View style={[appStyles.flexCenter, styles.orderCodeContainer]}>
              <Text style={[appStyles.textCenter, styles.orderCodeText]}>
                {order.order_code}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => orderHandleResult.setShowProducts(!showProducts)}
              style={[appStyles.alignCenter, appStyles.justifyBetweenRow]}>
              <Text style={[styles.orderTitleSecondary, {marginVertical: 14}]}>
                {order.products.length}{' '}
                {declOfNum(order.products.length, [
                  'позиция',
                  'позиции',
                  'позиций',
                ])}
              </Text>
              <Ionicons
                name={showProducts ? 'ios-chevron-up' : 'ios-chevron-down'}
                size={22}
                color={constants.colors.primaryText}
              />
            </TouchableOpacity>
            {showProducts && order.products?.length > 0
              ? order.products?.map(product => (
                  <SearchProductItem
                    product={product}
                    order
                    key={product.id.toString()}
                  />
                ))
              : null}
          </View>
          <View style={styles.innerOrderContainer}>
            <View style={[appStyles.justifyBetweenRow, appStyles.alignCenter]}>
              <Text
                style={[
                  styles.orderTitleSecondary,
                  styles.orderPointInfoTitle,
                ]}>
                Выдача заказа {order.delivery_point.name}
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={orderHandleResult.openDeliveryPoint}
                style={styles.orderPointInfoButton}>
                <Text style={styles.orderPointInfo}>Подробнее</Text>
                <Ionicons
                  name="ios-information-circle-outline"
                  size={14}
                  color="#007abc"
                />
              </TouchableOpacity>
            </View>
            <View style={{...styles.innerOrderContainer, borderBottomWidth: 0}}>
              <View style={appStyles.alignCenterRow}>
                <Location />
                <Text style={styles.orderMapText}>
                  {order.delivery_point.address.trim()}
                </Text>
              </View>
              <View style={[appStyles.alignCenterRow, {marginTop: 8}]}>
                <Car />
                <Text style={styles.orderMapText}>
                  Выдача{' '}
                  <Text style={[styles.orderMapText, {fontWeight: '700'}]}>
                    {
                      formatDate(order.delivery_date_info.date_start)
                        .formattedDate
                    }{' '}
                    {formatDate(order.delivery_date_info.date_start).day}{' '}
                    {getTimePeriod(
                      order.delivery_date_info.date_start,
                      order.delivery_date_info.date_end,
                    )}
                  </Text>
                </Text>
              </View>
              {order.delivery_point.description ? (
                <View style={{marginTop: 13}}>
                  <Text
                    style={{...styles.orderTitleSecondary, marginBottom: 6}}>
                    Как добраться:
                  </Text>
                  <Text style={{...styles.orderMapText, marginLeft: 0}}>
                    {order.delivery_point.description}
                  </Text>
                </View>
              ) : null}
              {order.delivery_point.gps_coordinates ? (
                <View style={styles.orderPointRouteButton}>
                  <AppButton
                    title="Построить маршрут"
                    onPress={() =>
                      LinkingService.buildRoute(
                        order?.delivery_point.gps_coordinates,
                        userCoordinates.join(','),
                        order?.delivery_point.address,
                      )
                    }
                  />
                </View>
              ) : null}
            </View>
            <MapboxGL.MapView
              onPress={() =>
                navigation.navigate('OrderRoute', {
                  order_delivery_point: order.delivery_point,
                  order_id: order.order_id,
                })
              }
              logoEnabled={false}
              localizeLabels={true}
              style={[appStyles.flexBlock, {height: isTablet() ? 550 : 280}]}>
              <MapboxGL.Camera
                centerCoordinate={[
                  +getCoordinates(order.delivery_point.gps_coordinates)[1],
                  +getCoordinates(order.delivery_point.gps_coordinates)[0],
                ]}
                zoomLevel={15}
              />
              <MapboxGL.PointAnnotation
                key={order.order_id.toString()}
                id={order.order_id.toString()}
                coordinate={[
                  +getCoordinates(order.delivery_point.gps_coordinates)[1],
                  +getCoordinates(order.delivery_point.gps_coordinates)[0],
                ]}>
                <DeliveryPointMarker width={48} height={48} />
              </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>
          </View>
          {order.order_cancellation ? (
            <View
              style={[styles.innerOrderContainer, styles.orderCancelButton]}>
              <AppButton
                backgroundColor="#fff"
                borderColor="#007abc"
                buttonShadow
                title="Отменить заказ"
                onPress={() => setCancelModalVisible(true)}
              />
            </View>
          ) : null}
          {order.is_evaluation ? (
            <View
              style={[styles.innerOrderContainer, styles.orderCancelButton]}>
              <AppButton
                title="Оценить заказ"
                onPress={() => orderHandleResult.setEvaluationStarted(true)}
              />
            </View>
          ) : null}
        </View>
      )}
      <OrderEvaluationModal
        id_order={order.order_id}
        isEvaluationStarted={orderHandleResult.isEvaluationStarted}
        setEvaluationStarted={orderHandleResult.setEvaluationStarted}
      />
      <OrderCancelModal
        isVisible={isCancelModalVisible}
        setVisible={setCancelModalVisible}
        onCloseModal={onCancelOrder}
      />
    </ScrollView>
  );
};

export default OrderScreen;
