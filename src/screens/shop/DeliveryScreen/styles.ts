import {StyleSheet, Dimensions} from 'react-native';

import constants from 'assets/styles/constants';
import appStyles from 'assets/styles/appStyles';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...appStyles.grow,
    padding: 15,
  },
  deliverySection: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
    marginBottom: 20,
    paddingBottom: 5,
  },
  deliveryDatesSection: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  deliverySectionTitle: {
    color: constants.colors.primaryText,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 17,
    marginLeft: 7,
  },
  deliverySectionSubtitle: {
    color: constants.colors.primaryText,
    fontSize: 14,
    fontFamily: 'Manrope-Medium',
    lineHeight: 15,
    marginLeft: 5,
    marginTop: 10,
  },
  deliverySectionSecondarySubtitle: {
    color: '#929393',
    fontSize: 14,
    fontFamily: 'Manrope-Medium',
    lineHeight: 15,
    marginLeft: 0,
    marginTop: 10,
    marginBottom: 18,
  },
  deliveryHintWrapper: {
    ...appStyles.grow,
    ...appStyles.flexCenter,
    paddingHorizontal: 30,
  },
  deliveryHintText: {
    color: constants.colors.primaryText,
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
  deliveryHintTextBottom: {
    borderTopColor: '#929393',
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 8,
  },
  dropdownPlaceholder: {
    color: '#929393',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 40,
  },
  buttonInnerContainer: {
    width: width * 0.9,
  },
});
