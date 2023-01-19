import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    ...appStyles.grow,
    ...appStyles.modalContent,
    ...appStyles.alignCenter,
    height: height * 0.93,
  },
  evaluationTitle: {
    ...appStyles.modalTitle,
    textAlign: 'left',
    marginBottom: 0,
  },
  evaluationSubtitle: {
    ...appStyles.appSubtitle,
    marginTop: 8,
    marginBottom: 32,
  },
  commentContainer: {
    marginTop: -5,
    marginBottom: 35,
  },
  commentLabel: {
    color: constants.colors.primaryText,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    marginBottom: 6,
  },
  commentInput: {
    borderBottomColor: constants.colors.primaryText,
    borderBottomWidth: 1,
    paddingBottom: 14,
  },
  evaluationButtonContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 33,
    width: width * 0.85,
  },
});
