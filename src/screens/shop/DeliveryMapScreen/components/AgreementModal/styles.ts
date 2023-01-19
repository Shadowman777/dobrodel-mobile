import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  contentContainer: {
    ...appStyles.modalContent,
    ...appStyles.alignCenter,
    height: height * 0.28,
  },
  modalContainer: {
    width: width * 0.9,
  },
  buttonContainer: {
    width: width * 0.85,
  },
  title: {
    ...appStyles.modalTitle,
    marginBottom: 7,
    textAlign: 'left',
  },
  subtitle: {
    color: constants.colors.primaryText,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    marginBottom: 8,
  },
  subtitleLink: {
    marginRight: 3,
    textDecorationLine: 'underline',
  },
});
