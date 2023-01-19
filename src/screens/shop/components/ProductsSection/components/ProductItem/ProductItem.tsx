import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import QuantityButton from 'components/app/QuantityButton/QuantityButton';
import QuantitySelect from 'screens/shop/components/QuantitySelect/QuantitySelect';

import {Product} from 'types/shop/shopTypes';
import {useAppSelector} from 'hooks/appHooks';
import {setProductId} from 'store/slices/shopSlice/shopSlice';

import CartService from 'services/shop/CartService';
import ProductService from 'services/shop/ProductService';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import {isTablet} from 'react-native-device-info';

interface IProductItemProps {
  product: Product;
  index: number;
  subCategory?: boolean;
}

const ProductItem: React.FC<IProductItemProps> = ({
  product,
  index,
  subCategory = false,
}) => {
  const cart = useAppSelector(state => state.shop.cart);
  const dispatch = useDispatch();

  const productImageSize = useMemo(() => {
    if (!CartService.checkProductInCart(cart, product)) {
      return isTablet() ? 220 : 110;
    }

    return isTablet() ? 195 : 85;
  }, [cart, product]);

  if (!product) {
    return null;
  }

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
      activeOpacity={1}
      onPress={() => dispatch(setProductId(product.id))}
      style={[
        styles.productContainer,
        index === 0 ? styles.productContainerBorderLeft : null,
        {
          width: !subCategory ? 157 : '50%',
        },
      ]}>
      <View style={{...appStyles.alignCenter, marginBottom: 5}}>
        <FastImage
          source={
            productImage === product.img ? {uri: productImage} : productImage
          }
          resizeMode={FastImage.resizeMode.contain}
          style={{height: productImageSize, width: productImageSize}}
        />
      </View>
      <View style={{...appStyles.grow, backgroundColor: 'transparent'}}>
        <View style={styles.productInfoWrapper}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={appStyles.productTitle}>
            {product.name}
          </Text>
          <View>
            <View style={[appStyles.justifyBetweenRow, appStyles.alignCenter]}>
              <Text style={appStyles.productInfo}>
                {product.quantity_per_unit || 'null'}{' '}
                {product.unit_measure_name}
                {productSecondUnit}
              </Text>
              <View
                style={[
                  appStyles.productsInfoPriceContainer,
                  appStyles.appButtonShadow,
                ]}>
                <Text style={appStyles.productInfo}>
                  {ProductService.formatProductPrice(product.price.toString())}₽
                </Text>
              </View>
            </View>
            {product.average_market_value ? (
              <View
                style={[
                  appStyles.justifyBetweenRow,
                  appStyles.alignCenter,
                  {marginTop: 6},
                ]}>
                <Text style={[appStyles.productAveragePrice, {fontSize: 9.5}]}>
                  Цена в магазинах:{' '}
                </Text>
                <Text style={[appStyles.productAveragePrice, {fontSize: 9.5}]}>
                  {ProductService.formatProductPrice(
                    product.average_market_value.toString(),
                  )}
                  ₽
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View
          style={[
            appStyles.justifyBetweenRow,
            appStyles.alignCenter,
            {marginTop: -5},
          ]}>
          <View>
            <Text style={styles.productPrice}>
              {ProductService.formatProductPrice(
                CartService.findProductPrice(cart, product).toFixed(2),
              )}
              ₽
            </Text>
          </View>
          {!CartService.checkProductInCart(cart, product) && (
            <QuantityButton
              onPress={() =>
                CartService.addInCart('plus', cart, product, dispatch)
              }
            />
          )}
        </View>
        {CartService.checkProductInCart(cart, product) && (
          <View style={{marginTop: 7.5}}>
            <QuantitySelect product={product} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
