import {StyleSheet} from 'react-native';

import constants from 'assets/styles/constants';

export default StyleSheet.create({
  actionsProductsWrapper: {
    paddingBottom: 100,
  },
  actionTitleWrapper: {
    marginVertical: 14,
  },
  actionHead: {
    marginHorizontal: 15,
  },
  actionTitle: {
    color: constants.colors.primaryText,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  actionDescription: {
    color: constants.colors.primaryText,
    fontSize: 12,
    lineHeight: 16,
  },
  actionProducts: {
    marginTop: 16,
  },
});
