import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  contentContainer: {
    ...appStyles.modalContent,
    ...appStyles.alignCenter,
    height: height * 0.25,
  },
  modalContainer: {
    width: width * 0.9,
  },
  buttonContainer: {
    width: width * 0.75,
  },
});
