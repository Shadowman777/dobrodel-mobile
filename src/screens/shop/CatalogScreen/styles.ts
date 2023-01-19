import {StyleSheet, Dimensions} from 'react-native';

import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  titleWrapper: {
    marginVertical: 25,
    marginLeft: 8,
  },
  categoryWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 224,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: width * 0.95,
  },
  categoryTitle: {
    color: constants.colors.primaryText,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
});
