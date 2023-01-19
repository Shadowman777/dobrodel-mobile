import React from 'react';
import {View, Text} from 'react-native';

import {ProductDetail} from 'types/shop/shopTypes';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const ProductDetails = ({detail}: {detail: ProductDetail}) => (
  <View style={[appStyles.row, {marginBottom: 5}]}>
    <View style={{flex: 2}}>
      <Text
        style={[appStyles.productInfo, styles.offShadow, {color: '#929393'}]}>
        {detail.name}
      </Text>
    </View>
    <View style={{flex: 2}}>
      <Text style={[appStyles.productInfo, styles.offShadow]}>
        {detail.value}
      </Text>
    </View>
  </View>
);

export default ProductDetails;
