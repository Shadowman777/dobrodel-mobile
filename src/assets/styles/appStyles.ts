import {StyleSheet, Dimensions, Platform} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {scale, moderateScale} from 'react-native-size-matters';

import constants from 'assets/styles/constants';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  flexBlock: {
    flex: 1,
  },
  justifyBetweenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alignCenterRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEndRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  grow: {
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  appHeaderShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  appHeaderTitle: {
    color: constants.colors.primaryText,
    fontSize: isTablet() ? 24 : scale(19),
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  appContentBlock: {
    padding: 15,
  },
  appTitle: {
    color: '#252628',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  appSubtitle: {
    color: '#929393',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    marginVertical: 15,
  },
  appSectionHeader: {
    marginRight: 25,
    marginLeft: 8,
    marginBottom: 8,
  },
  appSectionTitle: {
    color: constants.colors.primaryText,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
    marginRight: 8,
  },
  inputContainer: {
    borderWidth: 0,
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    color: constants.colors.primaryText,
    padding: 8,
  },
  productTitle: {
    color: '#252628',
    fontSize: !isTablet() ? scale(13) : 13,
    fontFamily: 'Manrope-Medium',
    lineHeight: 19,
    marginBottom: 10,
  },
  productInfo: {
    color: '#252628',
    fontSize: !isTablet() ? scale(12) : 12,
    fontFamily: 'Manrope-SemiBold',
    lineHeight: Platform.OS === 'ios' ? 15 : 15.5,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1,
  },
  productsInfoPriceContainer: {
    backgroundColor: constants.colors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  appButtonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  productAveragePrice: {
    color: '#929393',
    fontSize: 10,
    lineHeight: 12,
  },
  checkContainer: {
    position: 'absolute',
    right: 5,
    bottom: 8,
  },
  absoluteContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
  },
  modalWindow: {
    justifyContent: 'flex-end',
    flexGrow: 1,
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTopLine: {
    backgroundColor: '#c4c4c4',
    height: 2,
    marginHorizontal: 'auto',
    marginBottom: width < 333 ? 0 : 14,
    marginTop: 5,
    width: 58,
  },
  modalTitle: {
    color: constants.colors.primaryText,
    fontSize: isTablet() ? 22 : moderateScale(22, 1.3),
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: width < 333 ? 8 : 20,
    marginTop: 6,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.4,
  },
  modalRightButtonWrapper: {
    marginLeft: 10,
    width: '100%',
  },
  minOrderText: {
    color: constants.colors.primaryText,
    fontSize: 11,
    lineHeight: 15,
    marginLeft: 6,
  },
  dropdownWrapper: {
    marginBottom: 20,
    marginTop: -5,
  },
  dropdownContainer: {
    borderColor: constants.colors.primary,
    borderRadius: 25,
    borderTopWidth: 0,
    elevation: 1000,
    zIndex: 9999,
  },
});
