import {StyleSheet} from 'react-native';

import constants from 'assets/styles/constants';
import orderStyles from '../OrdersScreen/styles';
import appStyles from 'assets/styles/appStyles';

export default StyleSheet.create({
  orderWrapper: {
    ...appStyles.grow,
    ...appStyles.alignCenter,
    paddingTop: 12,
  },
  orderContainer: {
    width: constants.screen.width * 0.92,
  },
  innerOrderContainer: {
    marginTop: 10,
    paddingBottom: 10,
  },
  orderTitleText: {
    ...orderStyles.orderText,
    fontSize: 16,
    fontWeight: '700',
  },
  orderTitleSecondary: {
    color: constants.colors.primaryText,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 17,
  },
  orderSubtitle: {
    color: '#929393',
    fontSize: 12,
    lineHeight: 16,
    marginVertical: 8,
  },
  orderPayButton: {
    ...appStyles.appButtonShadow,
    marginTop: 18,
    width: constants.screen.width * 0.92,
  },
  orderCodeContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 100,
    height: 40,
    width: 106,
  },
  orderCodeText: {
    color: constants.colors.primaryText,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
  orderPointInfoTitle: {
    width: constants.screen.width * 0.6,
  },
  orderPointInfoButton: {
    ...appStyles.alignCenterRow,
    borderRadius: 100,
    borderColor: '#007abc',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  orderPointInfo: {
    color: '#acb5bd',
    lineHeight: 17,
    marginRight: 5,
  },
  orderPointRouteButton: {
    marginTop: 8,
    width: constants.screen.width * 0.92,
  },
  orderMapText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    marginLeft: 5,
  },
  orderMapTextTitle: {
    fontWeight: '700',
    paddingBottom: 7,
  },
  orderRouteButton: {
    marginTop: 14,
    width: 186,
  },
  orderCancelButton: {
    ...appStyles.appButtonShadow,
    borderBottomWidth: 0,
    marginTop: 25,
    marginBottom: 15,
  },
});
