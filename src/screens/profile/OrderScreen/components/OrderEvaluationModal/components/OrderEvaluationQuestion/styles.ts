import {StyleSheet} from 'react-native';

import constants from 'assets/styles/constants';

export default StyleSheet.create({
  questionContainer: {
    marginBottom: 32,
  },
  questionTitle: {
    color: constants.colors.primaryText,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    marginBottom: 6,
  },
  questionSubtitle: {
    color: constants.colors.primaryText,
    fontSize: 14,
    lineHeight: 19,
  },
  questionRatingContainer: {
    marginTop: 18,
    maxWidth: 190,
  },
});
