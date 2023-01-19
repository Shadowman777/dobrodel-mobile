import {StyleSheet, Platform} from 'react-native';

import appStyles from 'assets/styles/appStyles';

export default StyleSheet.create({
  continueButton: {
    ...appStyles.flexCenter,
    borderRadius: 36 / 2,
    height: 36,
    top: Platform.OS === 'ios' ? 15 : 23,
    marginLeft: 5,
    width: 36,
  },
});
