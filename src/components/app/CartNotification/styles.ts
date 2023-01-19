import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  notification: {
    ...appStyles.flexCenter,
    ...appStyles.appButtonShadow,
    backgroundColor: constants.colors.primary,
    borderRadius: 32,
    bottom: 30,
    height: 55,
    left: '6.4%',
    paddingHorizontal: 15,
    position: 'absolute',
    width: width * 0.87,
  },
  notificationText: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Manrope-Medium',
    lineHeight: 15,
  },
  notificationTextBold: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Manrope-ExtraBold',
    lineHeight: 17,
    marginLeft: 6,
  },
});
