import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import styles from 'components/headers/styles';

export default StyleSheet.create({
  headerRightButton: {
    ...appStyles.flexCenter,
    ...styles.headerIconContainer,
    marginRight: 4,
  },
});
