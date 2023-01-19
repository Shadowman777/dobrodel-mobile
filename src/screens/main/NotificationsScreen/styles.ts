import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...appStyles.grow,
    ...appStyles.alignCenter,
    padding: 15,
  },
  innerContainer: {
    width: width * 0.92,
  },
  switchRow: {
    ...appStyles.justifyBetweenRow,
    ...appStyles.alignCenter,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
    paddingVertical: 14,
  },
  switchRowText: {
    color: constants.colors.primaryText,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    maxWidth: 185,
  },
  notificationsLink: {
    ...appStyles.alignCenter,
    ...appStyles.justifyBetweenRow,
    marginTop: 14,
  },
});
