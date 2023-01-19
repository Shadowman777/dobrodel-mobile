import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import QuantitySelect from 'screens/shop/components/QuantitySelect/QuantitySelect';

import {Product, Cart} from 'types/shop/shopTypes';

import CartService from 'services/shop/CartService';
import ProductService from 'services/shop/ProductService';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import {setProductId} from 'store/slices/shopSlice/shopSlice';
import {useDispatch} from 'react-redux';

const CartProduct: React.FC<{cart: Cart; product: Product}> = ({
  cart,
  product,
}) => {
  const dispatch = useDispatch();
  const productImage = product.img || require('assets/images/not_found.png');
  const productSecondUnit =
    product.quantity_2 && product.unit_measure_2_name ? (
      <Text>
        {' '}
        / {product.quantity_2} {product.unit_measure_2_name}
      </Text>
    ) : null;

  return (
    <TouchableOpacity
      onPress={() => dispatch(setProductId(product.id))}
      style={[appStyles.row, styles.productContainer]}>
      <FastImage
        source={
          productImage === product.img ? {uri: productImage} : productImage
        }
        resizeMode={FastImage.resizeMode.contain}
        style={styles.productImage}
      />
      <View style={appStyles.flexBlock}>
        <View style={{marginBottom: 12}}>
          <Text style={appStyles.productTitle}>{product.name}</Text>
          <View style={appStyles.alignCenterRow}>
            <Text style={appStyles.productInfo}>
              {product.quantity_per_unit || 'null'} {product.unit_measure_name}
              {productSecondUnit}
            </Text>
            <View style={appStyles.productsInfoPriceContainer}>
              <Text style={appStyles.productInfo}>
                {ProductService.formatProductPrice((+product.price).toFixed(2))}
                ₽
              </Text>
            </View>
            {product.average_market_value ? (
              <Text
                style={{
                  ...appStyles.productAveragePrice,
                  marginLeft: 8,
                  fontSize: 11,
                }}>
                Цена в магазинах:{' '}
                {ProductService.formatProductPrice(
                  (+product.average_market_value).toFixed(2),
                )}
                ₽
              </Text>
            ) : null}
          </View>
        </View>
        <View style={[appStyles.justifyBetweenRow, appStyles.alignCenter]}>
          <View>
            <Text style={styles.productPrice}>
              {ProductService.formatProductPrice(
                CartService.findProductPrice(cart, product).toFixed(2),
              )}
              ₽
            </Text>
          </View>
          <QuantitySelect product={product} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartProduct;
