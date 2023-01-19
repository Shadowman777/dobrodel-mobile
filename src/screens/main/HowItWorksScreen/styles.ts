import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...appStyles.flexBlock,
  },
  instructionsRow: {
    ...appStyles.alignCenter,
    ...appStyles.justifyBetweenRow,
    left: -3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: width * 0.9,
  },
  instructionsTitle: {
    ...appStyles.appTitle,
    marginHorizontal: 13,
    marginTop: 25,
  },
  descriptionText: {
    color: '#000',
    fontSize: 14,
    lineHeight: 19,
    marginTop: 24,
    marginBottom: 32,
    marginHorizontal: 13,
  },
  infoIcon: {
    top: 2.5,
    marginRight: 8,
  },
  infoTitle: {
    color: constants.colors.primaryText,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 10,
  },
  infoSubtitle: {
    color: constants.colors.primaryText,
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 8,
  },
  instructionsImage: {
    ...appStyles.flexBlock,
  },
  instructionsButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25,
    marginBottom: 32,
    width: width * 0.9,
  },
});
