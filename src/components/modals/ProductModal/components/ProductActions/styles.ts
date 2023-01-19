import {StyleSheet, Dimensions, Platform} from 'react-native';

import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  productActionsContainer: {
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? 150 : 124,
    padding: 15,
    paddingTop: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? -5 : -8,
    },
    shadowOpacity: 0.19,
    shadowRadius: 7.62,
    width: width,
  },
  productActionsSum: {
    color: constants.colors.primaryText,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 32,
  },
});
