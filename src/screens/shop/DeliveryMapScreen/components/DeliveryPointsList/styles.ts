import {StyleSheet, Dimensions} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {moderateScale} from 'react-native-size-matters';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  listContainer: {
    ...appStyles.absoluteContainer,
    backgroundColor: 'transparent',
    top: undefined,
    bottom: 0,
    height: 'auto',
    paddingBottom: 18,
  },
  pointContainer: {
    ...appStyles.justifyBetween,
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 'auto',
    marginRight: 8,
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 17,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: 315,
  },
  datesText: {
    color: constants.colors.primaryText,
    fontSize: isTablet() ? 12 : moderateScale(12),
    lineHeight: 16,
  },
  datesTextBold: {
    fontWeight: '700',
  },
  distanceText: {
    color: constants.colors.primary,
    fontSize: isTablet() ? 14 : moderateScale(14),
    lineHeight: 19,
    fontWeight: '700',
    marginLeft: 6,
  },
  addressText: {
    color: '#333',
    fontSize: isTablet() ? 14 : moderateScale(14),
    fontWeight: '500',
    lineHeight: 19,
  },
  pointButtonsWrapper: {
    ...appStyles.alignCenter,
    ...appStyles.justifyBetweenRow,
    marginTop: 10,
  },
  pointButtonContainer: {
    width: width * 0.33,
  },
  pointInfoButton: {
    ...appStyles.alignCenterRow,
    ...appStyles.justifyCenter,
    borderColor: '#007abc',
    borderRadius: 100,
    borderWidth: 1,
    paddingVertical: 10,
    width: width * 0.33,
  },
  pointInfoText: {
    color: '#acb5bd',
    fontSize: 12,
    lineHeight: 16,
    paddingRight: 5,
  },
});
