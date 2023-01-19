import {StyleSheet, Dimensions} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...appStyles.modalContent,
    ...appStyles.alignCenter,
    height: height * 0.75,
  },
  productTopContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: width * 0.95,
  },
  productImage: {
    height: scale(200),
    width: scale(200),
  },
  productInfoWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: '#f3f3f3',
    paddingBottom: 18,
  },
  productTitle: {
    color: constants.colors.primaryText,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    marginVertical: 14,
  },
  productAveragePrice: {
    color: '#929393',
    fontSize: moderateScale(12),
    lineHeight: 16,
  },
  productPriceLabelContainer: {
    maxWidth: 160,
    marginVertical: 6,
  },
});
