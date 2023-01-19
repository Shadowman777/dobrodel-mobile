import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Portal} from '@gorhom/portal';

import {useAppSelector} from 'hooks/appHooks';

import ProductService from 'services/shop/ProductService';

import {navigate} from 'navigation/RootNavigation';
import {declOfNum} from 'utils/helpers';

import styles from './styles';
import appStyles from 'assets/styles/appStyles';

const CartNotification = () => {
  const cart = useAppSelector(state => state.shop.cart);
  const isCartButtonVisible = useAppSelector(
    state => state.shop.isCartButtonVisible,
  );

  if (!cart || !cart.basket?.length || !isCartButtonVisible) {
    return null;
  }

  return (
    <Portal>
      <TouchableOpacity
        onPress={() => navigate('Cart')}
        style={styles.notification}>
        <View style={appStyles.alignCenterRow}>
          <Text style={styles.notificationText}>
            В корзине {cart.quantity_basket}{' '}
            {declOfNum(cart.quantity_basket, ['товар', 'товара', 'товаров'])}
          </Text>
          {cart && cart.total_amount_basket ? (
            <Text style={styles.notificationTextBold}>
              {ProductService.formatProductPrice(
                cart.total_amount_basket.toString(),
              )}
              ₽
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </Portal>
  );
};

export default CartNotification;
