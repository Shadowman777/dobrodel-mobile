import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DropdownAlert from 'react-native-dropdownalert';
import DropdownAlertService from 'services/DropdownAlertService';

import styles from './styles';

export default function DropdownAlertCustom() {
  return (
    <DropdownAlert
      ref={(ref: DropdownAlert) => DropdownAlertService.set(ref)}
      closeInterval={2500}
      successColor="#53a653"
      renderImage={(props, state) => {
        switch (state.type) {
          case 'success':
            return <Ionicons name="ios-checkmark" style={styles.leftIcon} />;
          default:
            return <Ionicons name="ios-warning" style={styles.leftIcon} />;
        }
      }}
      renderCancel={() => {
        return <Ionicons name="ios-close" style={styles.closeIcon} />;
      }}
      showCancel={true}
      titleNumOfLines={47}
      messageNumOfLines={0}
    />
  );
}
