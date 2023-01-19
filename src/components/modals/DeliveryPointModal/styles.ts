import {StyleSheet, Dimensions, Platform} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {height, width} = Dimensions.get('window');

const imageHeight = (height * 0.75 * 35) / 100;

export default StyleSheet.create({
  container: {
    ...appStyles.modalContent,
    ...appStyles.alignCenter,
    ...appStyles.flexBlock,
  },
  deliveryPointContent: {
    ...appStyles.justifyCenter,
    flexDirection: 'row',
    maxHeight: height * 0.55,
    width: width * 0.95,
  },
  deliveryPointImage: {
    borderRadius: 6,
    height: imageHeight,
    marginRight: 6,
    width: width * 0.82,
  },
  deliveryPointImageFull: {
    width: '100%',
  },
  deliveryPointTitleWrapper: {
    marginVertical: 14,
  },
  deliveryPointTitle: {
    color: constants.colors.primaryText,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  deliveryPointSubtitle: {
    color: constants.colors.primaryText,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 34,
  },
  deliveryPointAddressText: {
    color: '#acb5bd',
    fontSize: 14,
    lineHeight: 18,
  },
  deliveryPointRouteButtonWrapper: {
    width: width * 0.6,
  },
  deliveryPointDatesWrapper: {
    ...appStyles.justifyBetweenRow,
    marginVertical: 15,
  },
  deliveryPointDatesText: {
    color: constants.colors.primaryText,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  deliveryPointDatesTimes: {
    borderRightColor: constants.colors.primaryText,
    borderRightWidth: 1,
    marginRight: 15,
    width: width * 0.46,
  },
  deliveryPointDatesTimeText: {
    color: constants.colors.primaryText,
    fontSize: 12,
    lineHeight: 16,
  },
  deliveryPointDates: {
    width: width * 0.48,
  },
  deliveryPointDescriptionWrapper: {
    borderTopColor: constants.colors.secondary,
    borderTopWidth: 1,
    marginBottom: 25,
  },
  deliveryPointDescription: {
    color: constants.colors.primaryText,
    fontSize: 14,
    lineHeight: 18,
  },
  deliveryPointButtonWrapper: {
    marginBottom: 15,
    marginTop: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: width * 0.8,
  },
  deliveryPointBottomContainer: {
    backgroundColor: '#fff',
    height: 150,
    padding: 15,
    paddingTop: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? -5 : -8,
    },
    shadowOpacity: 0.19,
    shadowRadius: 7.62,
    width: width,
  },
});
