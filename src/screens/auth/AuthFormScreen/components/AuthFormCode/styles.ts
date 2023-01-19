import {StyleSheet, Dimensions} from 'react-native';
import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  smsWrapper: {
    marginTop: 40,
    width: width * 0.9,
  },
  smsIntervalText: {
    color: '#929393',
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19,
  },
  smsButton: {
    marginTop: 40,
  },
  smsButtonText: {
    color: constants.colors.primary,
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    lineHeight: 22,
  },
});
