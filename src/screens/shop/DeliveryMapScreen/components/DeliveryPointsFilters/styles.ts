import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';

export default StyleSheet.create({
  filtersContainer: {
    ...appStyles.absoluteContainer,
    ...appStyles.alignEnd,
    ...appStyles.justifyCenter,
    ...appStyles.row,
    backgroundColor: '#fff',
    height: 98,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingBottom: 15,
  },
  filtersButton: {
    ...appStyles.flexCenter,
    borderWidth: 1,
    borderRadius: 100,
    width: 136,
    height: 32,
  },
  filtersButtonText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
});
