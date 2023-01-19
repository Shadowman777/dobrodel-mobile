import {StyleSheet, Dimensions} from 'react-native';

import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  orderInfoBlock: {
    marginTop: 21,
  },
  orderInfoBlockTitle: {
    color: constants.colors.primaryText,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 17,
    marginBottom: 8,
  },
  orderInfoBlockSubtitle: {
    color: constants.colors.primaryText,
    fontSize: 14,
    lineHeight: 15,
  },
  orderInfoBlockAddress: {
    width: width * 0.7,
  },
});
