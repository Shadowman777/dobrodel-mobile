import {Platform, StyleSheet, Dimensions} from 'react-native';

import constants from 'assets/styles/constants';
import appStyles from 'assets/styles/appStyles';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  promoCodeOuterWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: width * 0.93,
  },
  promoCodeInnerWrapper: {
    ...appStyles.alignCenterRow,
  },
  promoCodeLabel: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 13,
    marginTop: 22,
    marginBottom: 12,
  },
  promoInputContainer: {
    borderRadius: 100,
    borderWidth: 1,
  },
  promoInput: {
    color: constants.colors.primaryText,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 14 : 8,
  },
  promoCodeErrorText: {
    color: '#fa5051',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 13,
    marginTop: 12,
  },
  continueButton: {
    ...appStyles.flexCenter,
    borderRadius: 47 / 2,
    height: 47,
    left: -46,
    position: 'relative',
    width: 47,
  },
  checkIconContainer: {
    top: 6,
    right: 12,
  },
});
