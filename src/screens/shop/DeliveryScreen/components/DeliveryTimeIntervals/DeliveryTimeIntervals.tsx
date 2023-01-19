import React, {Dispatch, SetStateAction} from 'react';
import {Text, View} from 'react-native';
import {ValueType} from 'react-native-dropdown-picker';

import DeliveryTimeItem from '../DeliveryTimeItem/DeliveryTimeItem';

import {DeliveryPointExtended} from 'types/shop/shopTypes';

import Watch from 'assets/icons/watch.svg';

import appStyles from 'assets/styles/appStyles';
import deliveryStyles from 'screens/shop/DeliveryScreen/styles';
import styles from './styles';

interface IDeliveryTimeIntervalsProps {
  datePickup: string;
  setDatePickup: Dispatch<SetStateAction<string>>;
  dateDeliveryCheck: () => boolean;
  deliveryPoint: DeliveryPointExtended;
  deliveryDateId: ValueType | null;
}

const DeliveryTimeIntervals: React.FC<IDeliveryTimeIntervalsProps> = props => {
  const deliveryTimeItems = props.deliveryPoint.date_delivery
    .filter(item => item.id === props.deliveryDateId)[0]
    .convenient_time_receive_order.map(item => (
      <DeliveryTimeItem
        radioLabel={item.time.split(' ')[1].slice(0, -3)}
        activeRadioCondition={props.datePickup === item.time}
        onRadioPress={() => props.setDatePickup(item.time)}
        peopleText={
          props.datePickup === item.time
            ? item.count_people + 1
            : item.count_people
        }
        key={item.time}
      />
    ));

  return (
    <View style={styles.deliveryTimeSection}>
      <View style={appStyles.alignCenterRow}>
        <Watch />
        <Text style={deliveryStyles.deliverySectionTitle}>
          Уже знаете, во сколько заберете заказ?
        </Text>
      </View>
      <Text style={styles.deliveryTimeSecondarySubtitle}>
        Информация указывается справочно для вашего удобства. Независимо от
        выбора, заказ можно забрать в течение всего интервала 4 часа.
      </Text>
      <View>
        <DeliveryTimeItem
          radioLabel="Не указывать"
          activeRadioCondition={props.datePickup === ''}
          onRadioPress={() => props.setDatePickup('')}
          peopleText="Ожидается людей"
        />
        {props.dateDeliveryCheck() ? deliveryTimeItems : null}
      </View>
    </View>
  );
};

export default DeliveryTimeIntervals;
