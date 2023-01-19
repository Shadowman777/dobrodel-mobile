import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

export default StyleSheet.create({
  productsContentContainer: {
    marginHorizontal: 5,
  },
  watchAllContainer: {
    ...appStyles.flexCenter,
    borderColor: '#f3f3f3',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  watchAllText: {
    color: constants.colors.primary,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    marginTop: 10,
    textTransform: 'uppercase',
  },
});
