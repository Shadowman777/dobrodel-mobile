import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  slideButtonsWrapper: {
    ...appStyles.alignCenter,
    marginTop: 'auto',
    marginBottom: width < 333 ? 35 : 25,
  },
});
