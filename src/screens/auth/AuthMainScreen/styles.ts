import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  topContainer: {
    width: width * 0.65,
  },
  buttonContainer: {
    ...appStyles.center,
    marginTop: 10,
    width: '100%',
  },
  feedbackLinkText: {
    color: constants.colors.primaryText,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 15,
    marginLeft: 5,
  },
});
