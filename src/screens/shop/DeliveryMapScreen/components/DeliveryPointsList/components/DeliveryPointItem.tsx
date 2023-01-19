import React, {SetStateAction, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppButton from 'components/app/AppButton/AppButton';

import {
  setDeliveryPointButtonVisible,
  setDeliveryPointId,
} from 'store/slices/shopSlice/shopSlice';

import {DeliveryPointExtended} from 'types/shop/shopTypes';

import {
  formatDate,
  getCoordinates,
  getDistanceBetweenPoints,
  getTimePeriod,
} from 'utils/helpers';

import MapArrow from 'assets/icons/mapArrow.svg';

import styles from '../styles';
import appStyles from 'assets/styles/appStyles';

interface IDeliveryPointItemProps {
  selectPoint: (index: number, point: DeliveryPointExtended) => void;
  userCoordinates: number[];
  setCenterCoordinates: React.Dispatch<SetStateAction<number[]>>;
  point: DeliveryPointExtended;
  navigation: any;
  setPointsListVisible: React.Dispatch<SetStateAction<boolean>>;
  index: number;
  setActivePointIndex: React.Dispatch<SetStateAction<number>>;
  showDeliveryButton : boolean;
}

const DeliveryPointItem: React.FC<IDeliveryPointItemProps> = props => {
  const dispatch = useDispatch();

  const openDeliveryPoint = useCallback((): void => {
    dispatch(setDeliveryPointButtonVisible(props.showDeliveryButton)); 
    dispatch(setDeliveryPointId(props.point.id));
  }, []);

  return (
    <TouchableOpacity
      onPress={() => props.selectPoint(props.index, props.point)}
      style={styles.pointContainer}>
      <View>
        <View style={appStyles.justifyBetweenRow}>
          <View>
            {props.point.date_delivery && props.point.date_delivery.length > 0
              ? props.point.date_delivery.map(date => (
                  <View style={appStyles.alignCenterRow}>
                    <Text style={[styles.datesText, styles.datesTextBold]}>
                      {formatDate(date.date_start).formattedDate}{' '}
                    </Text>
                    <Text style={styles.datesText}>
                      {formatDate(date.date_start).day}{' '}
                    </Text>
                    <Text style={styles.datesText}>
                      {getTimePeriod(date.date_start, date.date_end)}
                    </Text>
                  </View>
                ))
              : null}
          </View>
          {props.userCoordinates && props.userCoordinates.length > 0 ? (
            <View style={appStyles.alignCenterRow}>
              <MapArrow />
              <Text style={styles.distanceText}>
                {getDistanceBetweenPoints(props.userCoordinates, [
                  +getCoordinates(props.point.gps_coordinates)[1],
                  +getCoordinates(props.point.gps_coordinates)[0],
                ]).toFixed(1)}{' '}
                км
              </Text>
            </View>
          ) : null}
        </View>
        <View style={{marginTop: 8}}>
          <Text style={styles.addressText}>{props.point.address.trim()}</Text>
        </View>
      </View>
      <View style={styles.pointButtonsWrapper}>
        <View style={styles.pointButtonContainer}>
          {props.showDeliveryButton  && (
            <AppButton
              title="Доставить сюда"
              onPress={() => {
                props.setPointsListVisible(false);
                props.navigation.navigate('Delivery', {
                  deliveryPoint: props.point,
                });
              }}
              fontSize={12}
              paddingVertical={10}
            />
          )}
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={openDeliveryPoint}
            style={styles.pointInfoButton}>
            <Text style={styles.pointInfoText}>Подробнее</Text>
            <Ionicons
              name="ios-information-circle-outline"
              size={14}
              color="#007abc"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DeliveryPointItem;
