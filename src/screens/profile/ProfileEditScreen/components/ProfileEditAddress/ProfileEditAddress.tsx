import React, {Dispatch, SetStateAction} from 'react';
import {View, Text} from 'react-native';

import {AppDeliveryZone} from 'types/shop/shopTypes';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const ProfileEditAddress: React.FC<{
  deliveryZone: AppDeliveryZone;
  setDeleteZoneModal: Dispatch<SetStateAction<boolean>>;
}> = ({deliveryZone}) => {
  return (
    <View style={styles.editAddressWrapper}>
      <Text style={styles.addressTitle}>Адрес</Text>
      <View style={[appStyles.alignCenter, appStyles.justifyBetweenRow]}>
        <Text style={styles.addressText}>{deliveryZone.address}</Text>
      </View>
    </View>
  );
};

export default ProfileEditAddress;
