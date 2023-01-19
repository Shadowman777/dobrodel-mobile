import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  ordersNotificationOuter: {
    ...appStyles.flexCenter,
    backgroundColor: '#fce9ec',
    minHeight: 41,
  },
  ordersNotificationInner: {
    ...appStyles.justifyBetweenRow,
    ...appStyles.alignCenter,
    width: width * 0.93,
  },
  ordersNotificationText: {
    color: '#e5243f',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    width: '90%',
  },
  minOrderText: {
    color: constants.colors.primaryText,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    marginRight: 3,
  },
});
