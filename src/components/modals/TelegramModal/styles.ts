import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';

export default StyleSheet.create({
  modalContainer: {
    ...appStyles.modalContent,
    ...appStyles.alignCenter,
  },
  modalButton: {
    ...appStyles.appButtonShadow,
    width: '100%',
  },
});
