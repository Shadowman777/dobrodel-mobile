import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  evaluationSuccessContainer: {
    ...appStyles.flexCenter,
    ...appStyles.grow,
    width: width * 0.85,
  },
  evaluationSuccessImage: {
    height: 78,
    marginBottom: 14,
    width: 78,
  },
  evaluationSuccessTitle: {
    color: constants.colors.primaryText,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: -0.2,
    marginBottom: 14,
    textAlign: 'center',
  },
  evaluationSuccessSubtitle: {
    color: '#929393',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 32,
    textAlign: 'center',
  },
  evaluationSuccessButtonContainer: {
    marginBottom: 32,
    width: width * 0.85,
  },
});
