import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Portal} from '@gorhom/portal';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const {width} = Dimensions.get('window');

interface IOrderRouteInfoProps {
  duration: number;
  distance: string;
  address: string;
}

const OrderRouteInfo: React.FC<IOrderRouteInfoProps> = props => {
  return (
    <Portal>
      <View style={styles.routeInfoContainer}>
        <View style={appStyles.modalTopLine} />
        <View style={{width: width * 0.9}}>
          <View style={appStyles.alignCenterRow}>
            <Text style={styles.routeDuration}>{props.duration} мин</Text>
            <Text style={styles.routeDistance}>({props.distance} км)</Text>
          </View>
          <Text style={styles.routeAddress}>{props.address}</Text>
        </View>
      </View>
    </Portal>
  );
};

export default OrderRouteInfo;
