import React, {useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import AppButton from 'components/app/AppButton/AppButton';
import AppLoading from 'components/app/AppLoading/AppLoading';
import EditProfileForm from 'components/form/EditProfileForm/EditProfileForm';
import Watch from 'assets/icons/watch.svg';
import Location from 'assets/icons/location.svg';

import {useAppSelector} from 'hooks/appHooks';
import {finishOrder} from 'store/slices/profileSlice/profileThunks';
import {setPaymentUrl} from 'store/slices/profileSlice/profileSlice';
import {setDeliveryPoint} from 'store/slices/shopSlice/shopSlice';
import {FinishOrderPayload} from 'store/slices/profileSlice/types';

import Pencil from 'assets/icons/pencil.svg';

import {formatDate, getTimePeriod} from 'utils/helpers';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const {width} = Dimensions.get('window');

const FormalizationScreen = () => {
  const settings = useAppSelector(state => state.main.settings);
  const user = useAppSelector(state => state.auth.user);
  const cart = useAppSelector(state => state.shop.cart);
  const paymentUrl = useAppSelector(state => state.profile.paymentUrl);
  const lastOrderId = useAppSelector(state => state.profile.lastOrderId);
  const deliveryPoint = useAppSelector(state => state.shop.deliveryPoint);
  const deliveryPickup = useAppSelector(state => state.shop.delivery_pickup);
  const deliveryDate = useAppSelector(state => state.shop.id_delivery_date);
  const promoCode = useAppSelector(state => state.shop.promoCode);
  const mainLoading = useAppSelector(state => state.loading.mainLoading);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleFinishOrder = (): void => {
    if (cart && cart.basket && cart.basket.length > 0) {
      const payload: FinishOrderPayload = {
        id_delivery_date: deliveryDate!,
        id_delivery_point: deliveryPoint!.id,
        comment: null,
        pickup: deliveryPickup,
        ...(promoCode ? {promo_code: promoCode} : {}),
        products: cart.basket.map(item => ({
          id_product: item.product_info.id,
          quantity: +item.quantity,
        })),
      };

      dispatch(finishOrder(payload));
    }
  };
  const openBrowser = async (): Promise<void> => {
    try {
      if (paymentUrl && (await InAppBrowser.isAvailable())) {
        await InAppBrowser.open(paymentUrl, {
          modalPresentationStyle: 'overCurrentContext',
          forceCloseOnRedirection: false,
          showInRecents: true,
        });
        dispatch(setPaymentUrl(''));
        dispatch(setDeliveryPoint(null));
        navigation.navigate('Order', {id_order: lastOrderId});
      }
    } catch (e) {}
  };
  const getDateData = useCallback((): {[k: string]: string} | null => {
    if (deliveryPoint && deliveryDate && deliveryPoint.date_delivery) {
      const dateDelivery = deliveryPoint.date_delivery.find(
        date => date.id === deliveryDate,
      );
      if (dateDelivery) {
        const startDate = deliveryPoint && dateDelivery.date_start;
        const endDate = deliveryPoint && dateDelivery.date_end;
        const editedDate = formatDate(startDate);

        return {
          formattedDate: editedDate.formattedDate,
          day: editedDate.day,
          time: getTimePeriod(startDate, endDate),
        };
      }
    }

    return null;
  }, [deliveryPoint, deliveryDate]);

  useEffect(() => {
    openBrowser();
  }, [paymentUrl]);

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[appStyles.grow, appStyles.alignCenter]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {mainLoading ? (
        <AppLoading loading={mainLoading} />
      ) : (
        <>
          <View style={{width: width * 0.9}}>
            <View>
              <View
                style={[appStyles.justifyBetweenRow, styles.orderInfoBlock]}>
                {deliveryPoint && deliveryPoint.address ? (
                  <View style={appStyles.row}>
                    <Location style={{marginRight: 7}} />
                    <View>
                      <Text style={styles.orderInfoBlockTitle}>
                        Пункт выдачи
                      </Text>
                      <Text
                        style={[
                          styles.orderInfoBlockSubtitle,
                          styles.orderInfoBlockAddress,
                        ]}>
                        {deliveryPoint!.address}
                      </Text>
                    </View>
                  </View>
                ) : null}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ShopNav', {
                      screen: 'DeliveryMap',
                      params: {mapType: 'points'},
                    })
                  }>
                  <Pencil />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.orderInfoBlock,
                appStyles.justifyBetweenRow,
                {
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#acb5bd',
                },
              ]}>
              {deliveryPoint &&
              deliveryDate &&
              deliveryPoint.date_delivery &&
              getDateData() !== null ? (
                <View style={[appStyles.row, {marginBottom: 25}]}>
                  <Watch style={{marginRight: 7}} />
                  <View>
                    <Text style={styles.orderInfoBlockTitle}>
                      Время и дата выдачи
                    </Text>
                    <Text style={styles.orderInfoBlockSubtitle}>
                      {getDateData()!.formattedDate} / {getDateData()!.day} (
                      {getDateData()!.time})
                    </Text>
                  </View>
                </View>
              ) : null}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ShopNav', {
                    screen: 'Delivery',
                    params: {deliveryPoint: deliveryPoint},
                  })
                }>
                <Pencil />
              </TouchableOpacity>
            </View>
            {settings && user ? (
              <View style={{marginTop: 8}}>
                <EditProfileForm
                  settings={settings}
                  user={user}
                  formalization
                />
              </View>
            ) : null}
          </View>
          <View style={{width: width * 0.85, marginTop: 45}}>
            <AppButton title="Завершить заказ" onPress={handleFinishOrder} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default FormalizationScreen;
