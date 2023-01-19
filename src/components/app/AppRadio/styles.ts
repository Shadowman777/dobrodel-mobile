import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

export default StyleSheet.create({
  outerRadio: {
    ...appStyles.flexCenter,
    borderWidth: 1,
    borderRadius: 9,
    height: 18,
    width: 18,
  },
  innerRadio: {
    backgroundColor: constants.colors.primary,
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  radioLabel: {
    color: constants.colors.primaryText,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    marginLeft: 12,
  },
});
