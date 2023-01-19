import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  paginationWrapper: {
    ...appStyles.alignCenterRow,
    backgroundColor: '#fff',
    height: 42,
    paddingHorizontal: 15,
  },
  paginationBar: {
    borderRadius: 2,
    height: 3,
    marginRight: 10,
    width: width < 333 ? 28 : 35,
  },
});
