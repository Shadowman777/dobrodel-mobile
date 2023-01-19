import {StyleSheet} from 'react-native';
import {isTablet} from 'react-native-device-info';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

export default StyleSheet.create({
  productContainer: {
    borderColor: '#f3f3f3',
    borderWidth: 2,
    height: isTablet() ? 380 : 260,
    padding: 5,
  },
  productContainerBorderLeft: {
    borderLeftWidth: 2,
  },
  productInfoWrapper: {
    ...appStyles.justifyBetween,
    marginBottom: 12,
    height: 90,
  },
  productPrice: {
    color: constants.colors.secondary,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
});
