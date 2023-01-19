import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, StatusBar} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import DropdownPicker, {ValueType} from 'react-native-dropdown-picker';

import CartProduct from '../CartProduct/CartProduct';
import PromoCodeInput from './components/PromoCodeInput/PromoCodeInput';
import AppButton from 'components/app/AppButton/AppButton';
import AgreementModal from 'components/modals/AgreementModal/AgreementModal';

import {useAppSelector} from 'hooks/appHooks';
import {Cart} from 'types/shop/shopTypes';
import {setOrderStarted} from 'store/slices/profileSlice/profileSlice';
import {startOrder} from 'store/slices/profileSlice/profileThunks';

import {StartOrderPayload} from 'store/slices/profileSlice/types';

import ProductService from 'services/shop/ProductService';
import AnalyticsService from 'services/AnalyticsService';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';
import styles from './styles';

const FullCart: React.FC<{cart: Cart}> = ({cart}) => {
  const [isDeliveryTypeModalVisible, setDeliveryTypeModalVisible] =
    useState<boolean>(false);
  const [deliveryTypeId, setDeliveryTypeId] = useState<ValueType | null>(0);
  const [open, setOpen] = useState<boolean>(false);

  const user = useAppSelector(state => state.auth.user);
  const isOrderStarted = useAppSelector(state => state.profile.isOrderStarted);
  const deliveryPoint = useAppSelector(state => state.shop.deliveryPoint);
  const deliveryZone = useAppSelector(state => state.shop.deliveryZone);
  const promoCode = useAppSelector(state => state.shop.promoCode);
  const settings = useAppSelector(state => state.main.settings);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleStartOrder = useCallback((): void => {
    if (!user) {
      if (
        settings?.displaying_choice_delivery_zone_when_placing_an_order &&
        !deliveryZone
      ) {
        navigation.navigate('DeliveryMap', {fromCart: true});
      } else {
        navigation.navigate('AuthNav', {
          screen: 'AuthForm',
          params: {cart: true},
        });
      }
    } else {
      const payload: StartOrderPayload = {
        ...(promoCode ? {promo_code: promoCode} : {}),
        products: cart.basket.map(item => ({
          id_product: item.product_info.id,
          quantity: +item.quantity,
        })),
      };

      dispatch(startOrder(payload));
    }
  }, [user, deliveryZone, settings, deliveryPoint, promoCode, cart.basket]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setOrderStarted(false));
    }, []),
  );

  useEffect(() => {
    if (isOrderStarted) {
      if (
        settings?.displaying_choice_delivery_zone_when_placing_an_order &&
        deliveryZone === null
      ) {
        navigation.navigate('DeliveryMap', {fromCart: true});
      } else if (!deliveryPoint) {
        navigation.navigate('DeliveryMap', {mapType: 'points'});
      } else {
        navigation.navigate('ProfileNav', {screen: 'Formalization'});
      }
    }
  }, [isOrderStarted, deliveryPoint, settings]);

  useEffect(() => {
    if (deliveryTypeId === 1) {
      setDeliveryTypeModalVisible(true);
      AnalyticsService.trackEvent('interest_in_delivery_299_in_cart').then();
      setDeliveryTypeId(0);
    }
  }, [deliveryTypeId]);

  const deliveryTypeItems = [
    {
      label: 'Самовывоз',
      value: 0,
    },
    {
      label: 'Доставка: 299 руб.',
      value: 1,
    },
  ];

  return (
    <View style={appStyles.grow}>
      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        barStyle="dark-content"
      />

      <View style={styles.cartTitleContainer}>
        <Text style={appStyles.appTitle}>Корзина</Text>
      </View>
      <View style={[appStyles.alignCenter, {marginTop: -13}]}>
        {cart.basket.map(basketItem => (
          <CartProduct
            cart={cart}
            product={basketItem.product_info}
            key={basketItem.product_info.name}
          />
        ))}
      </View>
      {user ? <PromoCodeInput /> : null}
      <View style={{...appStyles.alignCenter, marginVertical: 35}}>
        <View style={{width: constants.screen.width * 0.9}}>
          {cart.total_weight_basket ? (
            <View style={styles.cartInfoRow}>
              <Text
                style={[
                  styles.cartInfoText,
                  {width: constants.screen.width * 0.7},
                ]}>
                Вес корзины
              </Text>
              <Text style={styles.cartInfoText}>
                {ProductService.formatProductPrice(
                  cart.total_weight_basket.toString(),
                )}
                кг
              </Text>
            </View>
          ) : null}
          {cart.total_amount_average_market ? (
            <View style={styles.cartInfoRow}>
              <Text
                style={[
                  styles.cartInfoText,
                  {width: constants.screen.width * 0.7},
                ]}>
                Сумма в магазине у дома (справочно)
              </Text>
              <Text style={styles.cartInfoText}>
                {ProductService.formatProductPrice(
                  cart.total_amount_average_market.toString(),
                )}
                ₽
              </Text>
            </View>
          ) : null}
          {cart.saving ? (
            <View style={styles.cartInfoRow}>
              <Text style={styles.cartInfoText}>Сохранили, покупая у нас</Text>
              <Text style={[styles.cartInfoText, {color: '#0eb44d'}]}>
                -{ProductService.formatProductPrice(cart.saving.toString())}₽
              </Text>
            </View>
          ) : null}
          <View style={styles.cartInfoRow}>
            <Text style={styles.cartInfoText}>Стоимость доставки</Text>
            {cart.delivery_price ? (
              <Text style={styles.cartInfoText}>
                {ProductService.formatProductPrice(
                  cart.delivery_price.toString(),
                )}
                ₽
              </Text>
            ) : (
              <Text style={[styles.cartInfoText, {color: '#0eb44d'}]}>0₽</Text>
            )}
          </View>
          {cart.discount_promo_code ? (
            <View style={styles.cartInfoRow}>
              <Text style={styles.cartInfoText}>Скидка по промокоду</Text>
              <Text style={styles.cartInfoText}>
                {ProductService.formatProductPrice(
                  cart.discount_promo_code.toString(),
                )}
                ₽
              </Text>
            </View>
          ) : null}
          <View style={styles.cartInfoRow}>
            <Text style={styles.cartInfoTextBold}>Итого</Text>
            <View
              style={[
                appStyles.productsInfoPriceContainer,
                {paddingHorizontal: 7},
              ]}>
              <Text style={styles.cartInfoTextBold}>
                {ProductService.formatProductPrice(
                  cart.total_amount.toString(),
                )}
                ₽
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.deliveryTypeTitle}>Способ получения</Text>
      </View>
      {/* TODO создать общий компонент для дропдауна */}
      <DropdownPicker
        open={open}
        value={deliveryTypeId}
        items={deliveryTypeItems}
        setValue={setDeliveryTypeId}
        setOpen={setOpen}
        style={{
          borderColor: open ? constants.colors.primary : '#929393',
          borderRadius: open ? 25 : 100,
        }}
        listMode="SCROLLVIEW"
        dropDownDirection="BOTTOM"
        containerStyle={styles.deliveryTypeDropdown}
        dropDownContainerStyle={appStyles.dropdownContainer}
      />
      <View style={styles.cartButton}>
        <AppButton
          title={`Купить сейчас ${ProductService.formatProductPrice(
            cart.total_amount.toString(),
          )}₽`}
          onPress={handleStartOrder}
          paddingVertical={16}
          buttonShadow
        />
      </View>

      <AgreementModal
        isVisible={isDeliveryTypeModalVisible}
        setVisible={setDeliveryTypeModalVisible}
        title={
          'Ваш голос учтен, спасибо за проявленный интерес! Функциональность в разработке.'
        }
      />
    </View>
  );
};

export default FullCart;
