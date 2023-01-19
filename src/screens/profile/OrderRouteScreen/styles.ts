import {StyleSheet, Platform} from 'react-native';

import constants from 'assets/styles/constants';
import appStyles from 'assets/styles/appStyles';

export const styles = StyleSheet.create({
  deliveryZoneMarkerOuter: {
    backgroundColor: 'rgba(37, 38, 40, 0.2)',
    borderRadius: 16,
    height: 32,
    position: 'relative',
    width: 32,
  },
  deliveryZoneMarkerInner: {
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
  routeButtonsContainer: {
    ...appStyles.alignCenterRow,
    backgroundColor: constants.colors.primary,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    position: 'absolute',
    top: 120,
    right: 15,
    zIndex: 999,
  },
  routeButton: {
    ...appStyles.flexCenter,
    backgroundColor: constants.colors.primary,
    borderRightColor: constants.colors.primaryText,
    borderRightWidth: 1,
    paddingVertical: 5,
    width: 45,
  },
});

export const routeLineStyles = {
  lineWidth: 7,
  lineColor: '#83e916',
};
