import React from 'react';
import {Text, View} from 'react-native';

import AppRadio from 'components/app/AppRadio/AppRadio';

import styles from '../DeliveryTimeIntervals/styles';

interface IDeliveryTimeItem {
  radioLabel: string;
  activeRadioCondition: boolean;
  onRadioPress: () => void;
  peopleText: string | number;
}

const DeliveryTimeItem: React.FC<IDeliveryTimeItem> = props => {
  const {radioLabel, activeRadioCondition, onRadioPress, peopleText} = props;

  return (
    <View style={styles.deliveryTimeRow}>
      <View style={styles.deliveryTimeRowRadio}>
        <AppRadio
          label={radioLabel}
          active={activeRadioCondition}
          onPress={onRadioPress}
        />
      </View>
      <View style={styles.deliveryTimeRowPeopleCount}>
        <Text style={styles.peopleCountText}>{peopleText}</Text>
      </View>
    </View>
  );
};

export default DeliveryTimeItem;
