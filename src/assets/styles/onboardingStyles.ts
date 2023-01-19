import {StyleSheet, Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
import {isTablet} from 'react-native-device-info';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  onboardingSlide: {
    ...appStyles.grow,
    backgroundColor: '#fdf2c5',
    paddingHorizontal: 16,
    paddingBottom: 25,
    overflow: 'hidden',
    width: width,
  },
  onboardingStartImage: {
    height: 218,
    marginBottom: width < 333 ? -10 : 8,
    marginTop: width < 333 ? -10 : 25,
    maxWidth: width,
    width: width < 333 ? width - 30 : 357,
  },
  slideTitle: {
    color: constants.colors.primaryText,
    fontFamily: 'Manrope-ExtraBold',
    fontSize: isTablet() ? 28 : scale(28),
    lineHeight: 25,
    paddingTop: 20,
    paddingBottom: 5,
  },
  startSlideSubtitle: {
    color: constants.colors.primaryText,
    fontFamily: 'Manrope-Bold',
    fontSize: isTablet() ? 18 : scale(18),
    lineHeight: 24,
  },
  slideSubtitle: {
    color: constants.colors.primaryText,
    fontFamily: 'Manrope-ExtraBold',
    fontSize: isTablet() ? 22 : scale(22),
    lineHeight: 32,
    zIndex: 999,
  },
  slideSecondaryText: {
    color: constants.colors.primaryText,
    fontSize: isTablet() ? 16 : scale(16),
    lineHeight: 21,
  },
  slideMarkedText: {
    backgroundColor: constants.colors.primary,
  },
  slideSecondaryButtonText: {
    color: '#5cabe4',
    fontSize: 16,
    lineHeight: 19,
  },
  slideImage: {
    height: 689,
    width: '100%',
  },
});
