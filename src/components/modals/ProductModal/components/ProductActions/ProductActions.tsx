import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, Dimensions} from 'react-native';
import ShadowView from 'react-native-shadow-view';

import AppButton from 'components/app/AppButton/AppButton';
import QuantitySelect from 'screens/shop/components/QuantitySelect/QuantitySelect';

import {addToCart} from 'store/slices/shopSlice/shopThunks';
import {ProductDetailed} from 'types/shop/shopTypes';

import ProductService from 'services/shop/ProductService';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const {width} = Dimensions.get('window');

interface IProductActionsProps {
  product: ProductDetailed;
  productQuantity: number;
  changeProductQuantity: (type: 'minus' | 'plus') => void;
  eraseData: () => void;
}

const ProductActions: React.FC<IProductActionsProps> = ({
  product,
  productQuantity,
  changeProductQuantity,
  eraseData,
}) => {
  const dispatch = useDispatch();

  const goToBasket = (): void => {
    dispatch(
      addToCart({
        id_product: product.id,
        quantity: productQuantity * +product.quantity,
      }),
    );
    eraseData();
  };

  return (
    <ShadowView style={styles.productActionsContainer}>
      <View style={[appStyles.alignCenter, appStyles.justifyBetweenRow]}>
        <QuantitySelect
          product={product}
          productQuantity={productQuantity * +product.quantity}
          changeProductQuantity={changeProductQuantity}
        />
        <Text style={styles.productActionsSum}>
          {ProductService.formatProductPrice(
            (product.price * (productQuantity * +product.quantity)).toFixed(2),
          )}
          ₽
        </Text>
      </View>
      <View style={{...appStyles.flexCenter, marginTop: 15}}>
        <View style={{width: width * 0.75}}>
          <AppButton title="В корзину" onPress={goToBasket} buttonShadow />
        </View>
      </View>
    </ShadowView>
  );
};

export default ProductActions;
