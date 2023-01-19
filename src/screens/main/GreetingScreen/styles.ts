import {StyleSheet} from 'react-native';

import onboardingStyles from 'assets/styles/onboardingStyles';

export default StyleSheet.create({
  greetingText: {
    ...onboardingStyles.slideSecondaryText,
    fontWeight: '700',
    paddingLeft: 10,
    paddingBottom: 20,
  },
});
