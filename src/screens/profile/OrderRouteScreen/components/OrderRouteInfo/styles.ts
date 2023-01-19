import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

export default StyleSheet.create({
  routeInfoContainer: {
    ...appStyles.absoluteContainer,
    ...appStyles.modalContent,
    ...appStyles.alignCenter,
    height: 91,
    top: undefined,
    bottom: 0,
  },
  routeDuration: {
    color: constants.colors.primaryText,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  routeDistance: {
    color: constants.colors.primaryText,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    marginLeft: 3,
  },
  routeAddress: {
    color: constants.colors.primaryText,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    marginTop: 8,
  },
});
