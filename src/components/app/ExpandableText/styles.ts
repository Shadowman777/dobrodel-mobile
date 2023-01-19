import {StyleSheet} from 'react-native';

import constants from 'assets/styles/constants';

export default StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  text: {
    color: constants.colors.primaryText,
    fontSize: 14,
    lineHeight: 19,
  },
  expandText: {
    color: '#477fe6',
    fontSize: 14,
    lineHeight: 19,
    textDecorationLine: 'underline',
  },
});
