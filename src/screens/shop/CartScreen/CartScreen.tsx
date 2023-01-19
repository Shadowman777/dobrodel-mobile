import React from 'react';
import {useDispatch} from 'react-redux';
import {ScrollView, StatusBar, BackHandler} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import EmptyCart from './components/EmptyCart/EmptyCart';
import FullCart from './components/FullCart/FullCart';
import CartDeleteModal from './components/CartDeleteModal/CartDeleteModal';
import {useAppSelector} from 'hooks/appHooks';
import {getCart} from 'store/slices/shopSlice/shopThunks';
import {setCartButtonVisible} from 'store/slices/shopSlice/shopSlice';

import appStyles from 'assets/styles/appStyles';

const CartScreen = () => {
  const cart = useAppSelector(state => state.shop.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goBack = (): boolean => {
    navigation.navigate('ShopNav', {screen: 'Main'});
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCart());
      dispatch(setCartButtonVisible(false));

      BackHandler.addEventListener('hardwareBackPress', goBack);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', goBack);
      };
    }, []),
  );

  return (
    <ScrollView bounces={false} contentContainerStyle={appStyles.grow}>
      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        barStyle="dark-content"
      />

      {!cart || !cart.basket || cart.basket.length === 0 ? (
        <EmptyCart />
      ) : (
        <FullCart cart={cart} />
      )}

      <CartDeleteModal />
    </ScrollView>
  );
};

export default CartScreen;
