import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  deleteModal: {
    ...appStyles.modalContent,
    ...appStyles.alignCenter,
    height: height * 0.25,
  },
});
