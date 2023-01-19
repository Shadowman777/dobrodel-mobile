import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

export default StyleSheet.create({
  menuWrapper: {
    ...appStyles.grow,
    ...appStyles.justifyBetween,
    backgroundColor: '#fff',
    width: constants.screen.width * 0.92,
  },
  versionWrapper: {
    ...appStyles.alignEnd,
  },
  versionText: {
    color: '#acb5bd',
    fontSize: 12,
    lineHeight: 14,
  },
});
