import React from 'react';
import {useDispatch} from 'react-redux';
import {Text, View} from 'react-native';

import QuantityButton from 'components/app/QuantityButton/QuantityButton';

import CartService from 'services/shop/CartService';

import {useAppSelector} from 'hooks/appHooks';
import {Product} from 'types/shop/shopTypes';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const QuantitySelect: React.FC<{
  product: Product;
  productQuantity?: number;
  changeProductQuantity?: (type: 'minus' | 'plus') => void;
}> = ({product, productQuantity, changeProductQuantity}) => {
  const cart = useAppSelector(state => state.shop.cart);
  const dispatch = useDispatch();

  let formattedQuantity;
  if (productQuantity) {
    if (productQuantity.toString().includes('.')) {
      formattedQuantity = productQuantity.toFixed(1).replace('.', ',');
    } else {
      formattedQuantity = productQuantity;
    }
  } else {
    const quantity = CartService.findProductQuantity(cart, product);
    if (quantity.toString().includes('.')) {
      formattedQuantity = quantity.toFixed(1).replace('.', ',');
    } else {
      formattedQuantity = quantity;
    }
  }

  return (
    <View
      style={[appStyles.alignCenter, appStyles.justifyBetweenRow, {left: 1.5}]}>
      <QuantityButton
        onPress={() =>
          changeProductQuantity
            ? changeProductQuantity('minus')
            : CartService.addInCart('minus', cart, product, dispatch)
        }
        isInCart
        quantityType="minus"
      />
      <Text style={styles.quantityText}>
        {formattedQuantity} {product.unit_measure_name}
      </Text>
      <QuantityButton
        onPress={() =>
          changeProductQuantity
            ? changeProductQuantity('plus')
            : CartService.addInCart('plus', cart, product, dispatch)
        }
        isInCart
        quantityType="plus"
      />
    </View>
  );
};

export default QuantitySelect;
