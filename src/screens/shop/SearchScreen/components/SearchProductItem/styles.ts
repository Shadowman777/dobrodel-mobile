import {StyleSheet, Dimensions} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {scale} from 'react-native-size-matters';

import constants from 'assets/styles/constants';
import appStyles from 'assets/styles/appStyles';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  productContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#acb5bd',
    marginBottom: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 10,
    width: width * 0.92,
  },
  productImage: {
    width: isTablet() ? 65 : scale(58),
    height: isTablet() ? 65 : scale(58),
  },
  productTitleContainer: {
    marginBottom: 15,
  },
  productTitle: {
    color: constants.colors.primary,
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    lineHeight: 19,
  },
  productInfoContainer: {
    marginBottom: 15,
  },
  productInfo: {
    color: constants.colors.secondary,
    fontSize: 12,
    lineHeight: 16,
  },
  productPrice: {
    color: constants.colors.primaryText,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  productAdjustmentWrapper: {
    ...appStyles.alignCenter,
    ...appStyles.justifyBetweenRow,
    height: 20,
    marginTop: 6,
    paddingHorizontal: 7,
  },
  productAdjustmentText: {
    fontSize: 10,
    fontFamily: 'Manrope-SemiBold',
    lineHeight: 14,
  },
  productAdjustmentAmount: {
    color: '#000',
    fontSize: 10,
    lineHeight: 12,
    textDecorationStyle: 'solid',
    textDecorationColor: constants.colors.primaryText,
    textDecorationLine: 'line-through',
  },
});
