import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  FlatList,
  BackHandler,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import AntIcons from 'react-native-vector-icons/AntDesign';

import AppLoading from 'components/app/AppLoading/AppLoading';

import {useAppSelector} from 'hooks/appHooks';
import {Order} from 'types/profile/profileTypes';
import {getOrders} from 'store/slices/profileSlice/profileThunks';
import {setCartButtonVisible} from 'store/slices/shopSlice/shopSlice';

import OrdersService from 'services/profile/OrdersService';
import ProductService from 'services/shop/ProductService';
import {
  formatDate,
  formatOrderDate,
  getTimePeriod,
  getOrderDateTime,
} from 'utils/helpers';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import constants from 'assets/styles/constants';

const OrderItem = ({order, navigation}: {order: Order; navigation: any}) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Order', {id_order: order.order_id})}
    style={styles.orderItemBlock}>
    <Text style={styles.orderTitle}>Заказ №{order.order_id}</Text>
    <View>
      <View
        style={[
          appStyles.alignCenter,
          appStyles.justifyBetweenRow,
          styles.orderItemInfoBlock,
        ]}>
        <Text style={styles.orderText}>
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
              ...styles.orderText,
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
          styles.orderItemInfoBlock,
        ]}>
        <Text style={{...styles.orderText, fontWeight: '700'}}>
          Выдача {formatDate(order.delivery_date_info.date_start).formattedDate}{' '}
          ({formatDate(order.delivery_date_info.date_start).day})
        </Text>
        <Text style={{...styles.orderText, fontSize: 16, fontWeight: '700'}}>
          {ProductService.formatProductPrice(order.total_amount.toString())}₽
        </Text>
      </View>
      <View style={styles.orderItemInfoBlock}>
        <Text style={{...styles.orderText, fontWeight: '700'}}>
          {getTimePeriod(
            order.delivery_date_info.date_start,
            order.delivery_date_info.date_end,
          )}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const OrdersScreen = () => {
  const orders = useAppSelector(state => state.profile.orders);
  const ordersLoading = useAppSelector(state => state.loading.ordersLoading);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goBack = (): boolean => {
    navigation.navigate('Menu');
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setCartButtonVisible(false));

      BackHandler.addEventListener('hardwareBackPress', goBack);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', goBack);
      };
    }, []),
  );

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  if (!orders || orders.length === 0) {
    return null;
  }

  return (
    <View style={[appStyles.grow, appStyles.alignCenter]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {ordersLoading ? (
        <AppLoading loading={ordersLoading} />
      ) : (
        <FlatList
          data={orders}
          renderItem={({item}) => (
            <OrderItem order={item} navigation={navigation} />
          )}
          keyExtractor={item => item.order_id.toString()}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default OrdersScreen;
