import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';

export default StyleSheet.create({
  feedbackSubtitle: {
    ...appStyles.appTitle,
    fontSize: 18,
  },
  telegramButton: {
    ...appStyles.appButtonShadow,
    marginTop: 8,
    marginBottom: 10,
  },
  contactsContainer: {
    marginBottom: 30,
    marginTop: 12,
  },
  contactsTitle: {
    color: '#252628',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    marginBottom: 12,
  },
  contactsSubtitle: {
    color: '#252628',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 27,
  },
});
