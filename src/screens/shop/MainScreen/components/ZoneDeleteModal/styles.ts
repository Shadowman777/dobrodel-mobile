import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

export default StyleSheet.create({
  modalContainer: {
    ...appStyles.modalContent,
    ...appStyles.alignCenter,
    height: constants.screen.height * 0.26,
  },
});
