import {StyleSheet} from 'react-native';
import constants from 'assets/styles/constants';

export default StyleSheet.create({
  infoBlock: {
    paddingLeft: 15,
    paddingVertical: 7,
    backgroundColor: constants.colors.dimPrimary,
    flexWrap: 'wrap',
  },
  infoText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 15,
    marginRight: 8,
  },
  timerText: {
    marginRight: 0,
    textAlign: 'center',
  },
});
