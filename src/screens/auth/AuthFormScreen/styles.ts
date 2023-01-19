import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';

export default StyleSheet.create({
  authTop: {
    ...appStyles.alignCenter,
    flex: 1,
    paddingTop: 15,
  },
  authBottom: {
    ...appStyles.justifyEnd,
    flex: 3,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  authBottomText: {
    fontSize: 12,
    lineHeight: 14,
  },
  authBottomLink: {
    textDecorationLine: 'underline',
  },
});
