import {StyleSheet} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {scale} from 'react-native-size-matters';

import constants from 'assets/styles/constants';
import appStyles from 'assets/styles/appStyles';

export default StyleSheet.create({
  cartTitleContainer: {
    marginTop: 20,
    marginBottom: 5,
    paddingLeft: 15,
    paddingBottom: 15,
  },
  cartInfoRow: {
    ...appStyles.justifyBetweenRow,
    marginBottom: 8,
  },
  cartInfoText: {
    color: constants.colors.primaryText,
    fontSize: !isTablet() ? scale(13) : 13,
    fontFamily: 'Manrope-Medium',
    lineHeight: 19,
  },
  cartInfoTextBold: {
    color: constants.colors.primaryText,
    fontSize: !isTablet() ? scale(18) : 18,
    fontWeight: '700',
    lineHeight: 25,
  },
  cartDeliveryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    marginTop: 25,
    marginHorizontal: 15,
    paddingBottom: 18,
  },
  cartDeliveryRow: {
    marginBottom: 7,
  },
  cartDeliveryText: {
    color: constants.colors.primaryText,
    fontSize: !isTablet() ? scale(14) : 14,
    fontFamily: 'Manrope-Medium',
    lineHeight: 19,
    marginLeft: 6,
  },
  cartButton: {
    ...appStyles.appButtonShadow,
    marginBottom: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: constants.screen.width * 0.92,
  },
  deliveryTypeWrapper: {
    marginTop: 15,
  },
  deliveryTypeTitle: {
    color: constants.colors.primaryText,
    fontSize: !isTablet() ? scale(18) : 18,
    fontWeight: '700',
    lineHeight: 25,
    marginTop: -25,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: constants.screen.width * 0.92,
  },
  deliveryTypeDropdown: {
    ...appStyles.dropdownWrapper,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: constants.screen.width * 0.92,
  },
});
