import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import styles from 'screens/shop/DeliveryScreen/styles';

export default StyleSheet.create({
  deliveryTimeSection: {
    ...styles.deliverySection,
    borderBottomWidth: 0,
  },
  deliveryTimeSecondarySubtitle: {
    ...styles.deliverySectionSecondarySubtitle,
    lineHeight: 19,
  },
  deliveryTimeRow: {
    ...appStyles.justifyBetweenRow,
    marginBottom: 15,
  },
  deliveryTimeRowRadio: {
    width: 121,
  },
  deliveryTimeRowPeopleCount: {
    ...appStyles.alignCenter,
    width: 173,
  },
  peopleCountText: {
    color: '#929393',
  },
});
