import {StyleSheet, Platform} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

export default StyleSheet.create({
  deliveryZoneModal: {
    ...appStyles.alignCenter,
    ...appStyles.absoluteContainer,
    ...appStyles.modalContent,
    top: undefined,
    bottom: 0,
  },
  backContainer: {
    marginBottom: 25,
    marginTop: 55,
  },
  continueButton: {
    ...appStyles.flexCenter,
    borderRadius: 46 / 2,
    height: 46,
    left: -46,
    position: 'relative',
    width: 46,
  },
  zoneInputContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#e9e9e9',
  },
  zoneInputActiveContainer: {
    borderBottomWidth: 1,
    borderBottomColor: constants.colors.primaryText,
  },
  zoneInput: {
    color: constants.colors.primaryText,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 14 : 8,
  },
  zoneActiveInput: {
    color: constants.colors.primaryText,
    paddingLeft: 2,
    paddingRight: 10,
    paddingBottom: 6,
    paddingTop: Platform.OS === 'ios' ? 14 : 8,
  },
  zoneInputClearContainer: {
    height: 22,
    right: 10,
    top: 10,
    width: 22,
    zIndex: 999,
  },
});
