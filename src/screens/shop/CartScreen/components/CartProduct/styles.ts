import {StyleSheet, Dimensions} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {scale} from 'react-native-size-matters';

import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  productContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#acb5bd',
    marginTop: 15,
    paddingBottom: 15,
    width: width * 0.92,
  },
  productImage: {
    height: 70,
    marginRight: 8,
    width: 70,
  },
  productName: {
    color: '#212429',
    fontSize: !isTablet() ? scale(16) : 16,
    lineHeight: 22,
    marginBottom: 7,
  },
  productInfo: {
    color: '#acb5bd',
    fontSize: !isTablet() ? scale(14) : 14,
    lineHeight: 18,
    marginBottom: 15,
  },
  productQuantity: {
    marginHorizontal: 10,
  },
  productPrice: {
    color: constants.colors.primaryText,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 17,
  },
});
