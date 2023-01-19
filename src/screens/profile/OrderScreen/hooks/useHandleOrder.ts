import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {BackHandler} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import {
  setLastOrderId,
  setPaymentUrl,
  setRouteGeometry,
} from 'store/slices/profileSlice/profileSlice';
import {
  setDeliveryPointButtonVisible,
  setDeliveryPointId,
} from 'store/slices/shopSlice/shopSlice';
import {multiAddToCart} from 'store/slices/shopSlice/shopThunks';
import {getOrder, cancelOrder} from 'store/slices/profileSlice/profileThunks';

import {useAppSelector} from 'hooks/appHooks';

const useHandleOrder = () => {
  const [showProducts, setShowProducts] = useState<boolean>(true);
  const [isEvaluationStarted, setEvaluationStarted] = useState<boolean>(false);
  const [firstAddToCart, setFirstAddToCart] = useState<boolean>(true);
  const [isCancelModalVisible, setCancelModalVisible] =
    useState<boolean>(false);

  const order = useAppSelector(state => state.profile.order);
  const paymentUrl = useAppSelector(state => state.profile.paymentUrl);
  const mainLoading = useAppSelector(state => state.loading.mainLoading);
  const buttonLoading = useAppSelector(state => state.loading.buttonLoading);

  const route = useRoute();
  const {id_order}: any = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openBrowser = async (): Promise<void> => {
    try {
      if (paymentUrl && (await InAppBrowser.isAvailable())) {
        await InAppBrowser.open(paymentUrl, {
          modalPresentationStyle: 'overCurrentContext',
          forceCloseOnRedirection: false,
          showInRecents: true,
        });
        dispatch(setPaymentUrl(''));
      }
    } catch (e) {}
  };

  const goBack = (): boolean => {
    navigation.navigate('Orders');
    return true;
  };

  const openDeliveryPoint = useCallback((): void => {
    if (order && order.delivery_point) {
      dispatch(setDeliveryPointButtonVisible(false));
      dispatch(setDeliveryPointId(order.delivery_point.id));
    }
  }, [order]);

  const addOrderProductsToCart = useCallback(() => {
    if (firstAddToCart) {
      if (order && order.products && order.products.length > 0) {
        const payloadProducts = order.products.map(product => {
          return {
            id_product: product.product_info.id,
            quantity: product.quantity,
          };
        });
        const multiAddToCartPayload = {
          products: payloadProducts,
        };

        dispatch(multiAddToCart(multiAddToCartPayload));
        setFirstAddToCart(false);
      }
    } else {
      navigation.navigate('ShopNav', {screen: 'Cart'});
    }
  }, [order, firstAddToCart]);

  const onCancelOrder = (): void => {
    dispatch(cancelOrder({id_order}));
    setCancelModalVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      id_order && dispatch(getOrder(id_order));
      dispatch(setRouteGeometry(null));
      dispatch(setLastOrderId(''));

      BackHandler.addEventListener('hardwareBackPress', goBack);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', goBack);
        setFirstAddToCart(true);
        setCancelModalVisible(false);
      };
    }, []),
  );

  useEffect(() => {
    if (paymentUrl !== '') {
      openBrowser().then();
    }
  }, [paymentUrl]);

  return {
    isEvaluationStarted,
    isCancelModalVisible,
    order,
    id_order,
    addOrderProductsToCart,
    openDeliveryPoint,
    showProducts,
    mainLoading,
    buttonLoading,
    setShowProducts,
    setEvaluationStarted,
    setCancelModalVisible,
    onCancelOrder,
  };
};

export default useHandleOrder;
