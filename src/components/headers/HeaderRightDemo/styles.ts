import {StyleSheet} from 'react-native';

import constants from 'assets/styles/constants';

export default StyleSheet.create({
  demoTextWrapper: {
    backgroundColor: constants.colors.primary,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    position: 'relative',
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 999,
  },
  demoText: {
    color: '#000',
    fontSize: 12,
    lineHeight: 13,
  },
});
