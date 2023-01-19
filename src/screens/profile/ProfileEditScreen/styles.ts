import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

export default StyleSheet.create({
  profileEditWrapper: {
    ...appStyles.grow,
    ...appStyles.alignCenter,
    backgroundColor: '#fff',
  },
  telegramButton: {
    ...appStyles.appButtonShadow,
    marginTop: 'auto',
    marginBottom: 35,
    width: constants.screen.width * 0.82,
  },
});
