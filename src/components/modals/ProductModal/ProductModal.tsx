import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import useModal from 'hooks/sharedHooks/useModal';
import {View, Text, InteractionManager, AppState} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import {Portal} from '@gorhom/portal';
import FastImage from 'react-native-fast-image';

import ProductDetails from './components/ProductDetails/ProductDetails';
import ProductActions from './components/ProductActions/ProductActions';
import ExpandableText from 'components/app/ExpandableText/ExpandableText';
import AppLoading from 'components/app/AppLoading/AppLoading';

import {useAppSelector} from 'hooks/appHooks';
import {getProduct} from 'store/slices/shopSlice/shopThunks';
import {
  setProductId,
  setProduct,
  setCartButtonVisible,
} from 'store/slices/shopSlice/shopSlice';

import ProductService from 'services/shop/ProductService';
import {getRoute} from 'navigation/RootNavigation';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';
import styles from './styles';

const ProductModal = () => {
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [shortText, setShortText] = useState<string>('');

  const product_id = useAppSelector(state => state.shop.product_id);
  const product = useAppSelector(state => state.shop.product);
  const productLoading = useAppSelector(state => state.loading.productLoading);

  const route = getRoute();

  const {modalRef} = useModal(
    product_id,
    undefined,
    setCartButtonVisible,
    route === 'Cart',
  );

  const dispatch = useDispatch();

  const eraseData = useCallback((): void => {
    dispatch(setProduct(null));
    dispatch(setProductId(null));
    setProductQuantity(1);
    setShortText('');
  }, []);

  const handleAppStateChange = useCallback(
    (nextAppState: string) => {
      if (nextAppState === 'inactive' || nextAppState === 'background') {
        eraseData();
      }
    },
    [eraseData],
  );

  const changeProductQuantity = useCallback(
    (type: 'minus' | 'plus'): void => {
      if (type === 'minus' && productQuantity > 1) {
        setProductQuantity(prevState => prevState - 1);
      } else if (type === 'plus') {
        setProductQuantity(prevState => prevState + 1);
      }
    },
    [productQuantity],
  );

  const handleBackButtonPress = (): boolean => {
    eraseData();

    return true;
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (product_id) {
        dispatch(getProduct(product_id));
      }

      AppState.addEventListener('change', handleAppStateChange);

      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    });
  }, [handleAppStateChange, product_id]);

  const productImage =
    (product && product.img) || require('assets/images/not_found.png');
  const productSecondUnit =
    product && product.quantity_2 && product.unit_measure_2_name ? (
      <Text>
        {' '}
        / {product.quantity_2} {product.unit_measure_2_name}
      </Text>
    ) : null;

  const modalContent = (
    <View style={styles.container}>
      {productLoading ? (
        <AppLoading />
      ) : (
        <>
          <View style={appStyles.modalTopLine} />
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.productTopContainer]}
            style={appStyles.flexBlock}>
            <View style={appStyles.alignCenter}>
              <FastImage
                source={
                  productImage === (product && product.img)
                    ? {
                        uri: productImage,
                        priority: FastImage.priority.high,
                      }
                    : productImage
                }
                resizeMode="contain"
                style={styles.productImage}
              />
            </View>
            <View>
              <Text style={styles.productTitle}>{product && product.name}</Text>
              <View>
                <View style={styles.productInfoWrapper}>
                  <View>
                    <View
                      style={[
                        appStyles.justifyBetweenRow,
                        appStyles.alignCenter,
                      ]}>
                      <View style={appStyles.alignCenterRow}>
                        {product ? (
                          <Text style={appStyles.productInfo}>
                            1 {product.unit_measure_name}
                            {productSecondUnit}
                          </Text>
                        ) : null}
                        <View style={appStyles.productsInfoPriceContainer}>
                          <Text style={appStyles.productInfo}>
                            {product &&
                              ProductService.formatProductPrice(
                                product.price.toString(),
                              )}
                            ₽
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.productAveragePrice}>
                        Цена в магазинах:{' '}
                        {product &&
                          ProductService.formatProductPrice(
                            Number(product.average_market_value).toFixed(2),
                          )}
                        ₽
                      </Text>
                    </View>
                    {product && product.unit_measure_name === 'кг' ? (
                      <View style={styles.productPriceLabelContainer}>
                        <Text style={appStyles.productAveragePrice}>
                          Итоговая стоимость будет скорректирована на
                          фактический вес
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
              {product && product.description ? (
                <ExpandableText
                  text={product.description}
                  shortText={shortText}
                  setShortText={setShortText}
                />
              ) : null}
            </View>
            <View style={{marginBottom: 25}}>
              {product && product.detail && product.detail.length > 0
                ? product.detail.map(detailItem => (
                    <ProductDetails
                      detail={detailItem}
                      key={`${+new Date()}_${detailItem.name}`}
                    />
                  ))
                : null}
            </View>
          </ScrollView>
        </>
      )}
      {product ? (
        <ProductActions
          product={product}
          productQuantity={productQuantity}
          changeProductQuantity={changeProductQuantity}
          eraseData={eraseData}
        />
      ) : null}
    </View>
  );

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        onClosed={eraseData}
        onBackButtonPress={handleBackButtonPress}
        onOverlayPress={eraseData}
        handleStyle={{display: 'none'}}
        modalHeight={constants.screen.height * 0.75}
        rootStyle={appStyles.modalWindow}>
        {modalContent}
      </Modalize>
    </Portal>
  );
};

export default ProductModal;
