import {StyleSheet, Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  slideContainer: {
    ...appStyles.flexCenter,
    ...appStyles.flexBlock,
    width: width,
    height: '100%',
  },
  slideInnerContainer: {
    width: width * 0.85,
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  slideBackgroundImage: {
    position: 'absolute',
    top: -80,
    left: -65,
    width: width,
  },
  slideImageContainer: {
    height: 272,
    width: 280,
  },
  slideImage: {
    flex: 1,
  },
  slideTitle: {
    color: constants.colors.primaryText,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 43,
    letterSpacing: -0.2,
    marginVertical: 24,
    textAlign: 'center',
  },
  slideDescription: {
    color: '#929393',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
  },
  specialSlideWrapper: {
    backgroundColor: '#cfddf9',
    paddingHorizontal: 0,
  },
  specialSlideTitleTop: {
    marginLeft: 18,
    marginTop: 15,
  },
  specialSlideTitleBottom: {
    marginLeft: 'auto',
    marginRight: 18,
    marginTop: 8,
    textAlign: 'right',
  },
  specialSlideButtons: {
    bottom: 0,
    height: 'auto',
    left: width * 0.04,
    position: 'absolute',
    width: width * 0.92,
  },
  orderSlideWrapper: {
    ...appStyles.alignCenter,
    marginTop: 'auto',
    width: '100%',
  },
  zoneSlideWrapper: {
    ...appStyles.justifyBetween,
    ...appStyles.grow,
    backgroundColor: 'transparent',
  },
  zoneSlideManImage: {
    position: 'absolute',
    top: height * 0.03,
    left: width - width * 0.37,
    height: height * 0.4,
    width: width * 0.5,
  },
  zoneSlideWomanImage: {
    position: 'absolute',
    top: width < 333 ? height * 0.34 : height * 0.45,
    left: -13,
    height: height * 0.3,
    width: width * 0.35,
  },
  zoneSlideNatureImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width,
  },
  zoneSlideInfoWrapper: {
    width: width < 333 ? 175 : 204,
    marginLeft: 'auto',
    marginBottom: 30,
  },
  infoIcon: {
    top: 2.5,
    marginRight: 8,
  },
  infoTitle: {
    color: constants.colors.primaryText,
    fontSize: scale(14),
    fontFamily: 'Manrope-ExtraBold',
    lineHeight: 22,
    marginBottom: 10,
  },
  infoSubtitle: {
    color: constants.colors.primaryText,
    fontSize: scale(14),
    lineHeight: 19,
    marginBottom: 8,
  },
});
