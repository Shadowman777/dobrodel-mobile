import {StyleSheet} from 'react-native';

import constants from 'assets/styles/constants';

export default StyleSheet.create({
  listItemText: {
    color: constants.colors.primaryText,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
  },
  listItemTextBold: {
    color: constants.colors.primaryText,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
  },
});
