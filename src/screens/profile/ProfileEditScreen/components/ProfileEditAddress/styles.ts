import {StyleSheet, Dimensions} from 'react-native';

import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  editAddressWrapper: {
    marginTop: 42,
    width: width * 0.9,
  },
  addressTitle: {
    color: constants.colors.primaryText,
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 20,
    lineHeight: 27,
    marginBottom: 12,
  },
  addressText: {
    color: constants.colors.primaryText,
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    lineHeight: 21,
    maxWidth: 273,
  },
});
