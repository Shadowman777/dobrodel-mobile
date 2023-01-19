import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';

export default StyleSheet.create({
  deleteModal: {
    ...appStyles.modalContent,
    ...appStyles.alignCenter,
    paddingBottom: 20,
  },
});
