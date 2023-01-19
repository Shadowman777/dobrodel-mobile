import {StyleSheet, Dimensions} from 'react-native';

import constants from 'assets/styles/constants';
import styles from 'components/headers/styles';
import appStyles from 'assets/styles/appStyles';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  userZoneMarkerOuter: {
    backgroundColor: 'rgba(37, 38, 40, 0.2)',
    borderRadius: 16,
    height: 32,
    position: 'relative',
    width: 32,
  },
  userZoneMarkerInner: {
    backgroundColor: constants.colors.primaryText,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    height: 20,
    left: 6,
    top: 6,
    position: 'absolute',
    width: 20,
  },
  backButtonContainer: {
    ...appStyles.flexCenter,
    ...styles.headerIconContainer,
    position: 'absolute',
    left: 25,
    top: height * 0.11,
    zIndex: 999,
  },
  deliveryZoneWarningOuter: {
    ...appStyles.flexCenter,
    backgroundColor: '#fce9ec',
    height: 48,
    position: 'absolute',
    left: 0,
    top: 30,
    width: '100%',
    zIndex: 999,
  },
  deliveryZoneWarningInner: {
    ...appStyles.alignCenterRow,
    ...appStyles.justifyCenter,
    width: '100%',
  },
  deliveryZoneWarningText: {
    color: '#e5243f',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    marginLeft: 7,
  },
});
