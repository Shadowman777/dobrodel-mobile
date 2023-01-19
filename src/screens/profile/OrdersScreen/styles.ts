import {StyleSheet, Dimensions} from 'react-native';

import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  orderItemBlock: {
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    paddingBottom: 18,
    width: width * 0.92,
  },
  orderItemInfoBlock: {
    marginTop: 5,
  },
  orderTitle: {
    color: constants.colors.primaryText,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    marginVertical: 12,
  },
  orderText: {
    color: constants.colors.primaryText,
    fontSize: 14,
    lineHeight: 17,
    marginLeft: 7,
  },
});
