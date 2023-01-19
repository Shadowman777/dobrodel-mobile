import React, {Dispatch, SetStateAction} from 'react';
import {View, Text, TouchableOpacity, LayoutRectangle} from 'react-native';
import {Portal} from '@gorhom/portal';

import {DeliveryPointExtended} from 'types/shop/shopTypes';

import styles from './styles';
import constants from 'assets/styles/constants';

interface IDeliveryPointsFilters {
  filterType: 'distance' | 'time';
  setFilterType: Dispatch<SetStateAction<'distance' | 'time'>>;
  setActivePointIndex: Dispatch<SetStateAction<number>>;
  selectPoint: (index: number, point: DeliveryPointExtended) => void;
  deliveryPoints: DeliveryPointExtended[];
  setFiltersLayout: Dispatch<SetStateAction<LayoutRectangle | undefined>>;
}

const DeliveryPointsFilters: React.FC<IDeliveryPointsFilters> = ({
  filterType,
  setFilterType,
  setActivePointIndex,
  selectPoint,
  deliveryPoints,
  setFiltersLayout,
}) => {
  const changeFilterType = (type: 'distance' | 'time'): void => {
    setFilterType(type);
    setActivePointIndex(0);
    selectPoint(0, deliveryPoints[0]);
  };

  return (
    <Portal>
      <View
        onLayout={e => setFiltersLayout(e.nativeEvent.layout)}
        style={styles.filtersContainer}>
        <TouchableOpacity
          onPress={() =>
            filterType !== 'distance' ? changeFilterType('distance') : null
          }
          style={[
            styles.filtersButton,
            {
              borderColor:
                filterType === 'distance'
                  ? constants.colors.primaryText
                  : '#929393',
              marginRight: 8,
            },
          ]}>
          <Text
            style={[
              styles.filtersButtonText,
              {
                color:
                  filterType === 'distance'
                    ? constants.colors.primaryText
                    : '#929393',
              },
            ]}>
            Дистанция
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            filterType !== 'time' ? changeFilterType('time') : null
          }
          style={[
            styles.filtersButton,
            {
              borderColor:
                filterType === 'time'
                  ? constants.colors.primaryText
                  : '#929393',
              marginRight: 8,
            },
          ]}>
          <Text
            style={[
              styles.filtersButtonText,
              {
                color:
                  filterType === 'time'
                    ? constants.colors.primaryText
                    : '#929393',
              },
            ]}>
            Время
          </Text>
        </TouchableOpacity>
      </View>
    </Portal>
  );
};

export default DeliveryPointsFilters;
