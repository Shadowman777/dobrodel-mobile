import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import QuantityButton from 'components/app/QuantityButton/QuantityButton';
import QuantitySelect from 'screens/shop/components/QuantitySelect/QuantitySelect';

import {useAppSelector} from 'hooks/appHooks';
import {setProductId} from 'store/slices/shopSlice/shopSlice';

import CartService from 'services/shop/CartService';
import ProductService from 'services/shop/ProductService';
import AnalyticsService from 'services/AnalyticsService';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const SearchProductItem: React.FC<{
  product: any;
  order?: boolean;
}> = ({product, order = false}) => {
  const cart = useAppSelector(state => state.shop.cart);
  const dispatch = useDispatch();

  const openProduct = useCallback((id: number, product_name: string) => {
    dispatch(setProductId(id));
    AnalyticsService.trackEvent('open_product_from_search', {
      productName: product_name,
    });
  }, []);

  if (!product) {
    return null;
  }

  let productImage;
  if (order && product.product_info && product.product_info.img) {
    productImage = product.product_info.img;
  } else if (product.img) {
    productImage = product.img;
  } else {
    productImage = require('assets/images/not_found.png');
  }

  let productSecondUnit;
  if (
    order &&
    product.product_info.quantity_2 &&
    product.product_info.unit_measure_2_name
  ) {
    productSecondUnit = (
      <Text>
        {' '}
        / {product.product_info.quantity_2}{' '}
        {product.product_info.unit_measure_2_name}
      </Text>
    );
  } else if (!order && product.quantity_2 && product.unit_measure_2_name) {
    productSecondUnit = (
      <Text>
        {' '}
        / {product.quantity_2} {product.unit_measure_2_name}
      </Text>
    );
  }

  let productQuantityPerUnit;
  if (order) {
    productQuantityPerUnit = product.product_info.quantity_per_unit;
  } else {
    productQuantityPerUnit = product.quantity_per_unit;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        !order ? openProduct(product.id, product.name) : undefined
      }
      style={[styles.productContainer, appStyles.row]}>
      <View>
        <FastImage
          source={
            typeof productImage === 'string'
              ? {uri: productImage}
              : productImage
          }
          resizeMode={FastImage.resizeMode.contain}
          style={styles.productImage}
        />
      </View>
      <View style={{marginLeft: 30, flex: 1}}>
        <View style={{marginBottom: 12}}>
          <Text style={appStyles.productTitle}>
            {product.name || product.product_info.name}
          </Text>
          <View style={appStyles.alignCenterRow}>
            <Text style={appStyles.productInfo}>
              {productQuantityPerUnit || 'null'}{' '}
              {order
                ? product.product_info.unit_measure_name
                : product.unit_measure_name}
              {productSecondUnit}
            </Text>
            <View style={appStyles.productsInfoPriceContainer}>
              <Text style={appStyles.productInfo}>
                {ProductService.formatProductPrice(
                  order
                    ? product.product_info.price.toString()
                    : product.price.toString(),
                )}
                ₽
              </Text>
            </View>
            {product.average_market_value ||
            product.product_info.average_market_value ? (
              <Text style={{...appStyles.productAveragePrice, marginLeft: 8}}>
                Цена в магазине:{' '}
                {product.average_market_value
                  ? ProductService.formatProductPrice(
                      product.average_market_value.toString(),
                    )
                  : ProductService.formatProductPrice(
                      product.product_info.average_market_value.toString(),
                    )}
                ₽
              </Text>
            ) : null}
          </View>
        </View>
        <View style={[appStyles.justifyBetweenRow, appStyles.alignCenter]}>
          {!order ? (
            <Text style={styles.productPrice}>
              {ProductService.formatProductPrice(
                CartService.findProductPrice(
                  cart,
                  order ? product.product_info : product,
                ).toFixed(2),
              )}
              ₽
            </Text>
          ) : (
            <Text style={styles.productPrice}>
              {product.quantity.toString().includes('.')
                ? Number(product.quantity).toFixed(1).replace('.', ',')
                : product.quantity}{' '}
              {product.product_info.unit_measure_name}
            </Text>
          )}
          {!order ? (
            <>
              {!CartService.checkProductInCart(cart, product) ? (
                <QuantityButton
                  onPress={() =>
                    CartService.addInCart('plus', cart, product, dispatch)
                  }
                />
              ) : (
                <QuantitySelect product={product} />
              )}
            </>
          ) : (
            <Text style={styles.productPrice}>
              {ProductService.formatProductPrice(
                Number(product.total_amount).toFixed(2),
              )}
              ₽
            </Text>
          )}
        </View>
        {order && product.adjustment ? (
          <View
            style={[
              styles.productAdjustmentWrapper,
              {
                backgroundColor:
                  product.adjustment.type === 'adjustment'
                    ? '#eff8e1'
                    : '#f8e1e1',
              },
            ]}>
            <Text
              style={[
                styles.productAdjustmentText,
                {
                  color:
                    product.adjustment.type === 'adjustment'
                      ? '#7cad5f'
                      : '#fa5051',
                },
              ]}>
              {product.adjustment.text}
            </Text>
            {product.adjustment.amount ? (
              <Text style={styles.productAdjustmentAmount}>
                {ProductService.formatProductPrice(
                  product.adjustment.amount.replace('-', ''),
                )}{' '}
                ₽
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default SearchProductItem;
