import React, {useMemo, Dispatch, SetStateAction} from 'react';
import {View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useScroll from 'hooks/sharedHooks/useScroll';

import DeliveryPointItem from './components/DeliveryPointItem';

import {DeliveryPointExtended} from 'types/shop/shopTypes';

import styles from './styles';

import MapService from 'services/shop/MapService';

interface IDeliveryPointsList {
  selectPoint: (index: number, point: DeliveryPointExtended) => void;
  userCoordinates: number[];
  setCenterCoordinates: Dispatch<SetStateAction<number[]>>;
  deliveryPoints: DeliveryPointExtended[];
  setPointsListVisible: Dispatch<SetStateAction<boolean>>;
  activePointIndex: number;
  setActivePointIndex: Dispatch<SetStateAction<number>>;
  showDeliveryButton : boolean;
}

const DeliveryPointsList: React.FC<IDeliveryPointsList> = ({
  selectPoint,
  userCoordinates,
  setCenterCoordinates,
  deliveryPoints,
  setPointsListVisible,
  activePointIndex,
  setActivePointIndex,
  showDeliveryButton ,
}) => {
  const {flatListRef, handleOnScrollToIndexFailed} =
    useScroll(activePointIndex);
  const navigation = useNavigation();

  const filteredPoints = useMemo((): DeliveryPointExtended[] => {
    return MapService.filterPoints(userCoordinates, deliveryPoints);
  }, [userCoordinates, deliveryPoints]);

  const renderPointCard = ({
    item,
    index,
  }: {
    item: DeliveryPointExtended;
    index: number;
  }): JSX.Element => {
    return (
      <DeliveryPointItem
        selectPoint={selectPoint}
        userCoordinates={userCoordinates}
        setCenterCoordinates={setCenterCoordinates}
        point={item}
        navigation={navigation}
        setPointsListVisible={setPointsListVisible}
        index={index}
        setActivePointIndex={setActivePointIndex}
        showDeliveryButton ={showDeliveryButton }
      />
    );
  };

  if (!filteredPoints || filteredPoints.length === 0) {
    return null;
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        ref={flatListRef}
        data={filteredPoints}
        renderItem={renderPointCard}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 8}}
        initialScrollIndex={activePointIndex}
        onScrollToIndexFailed={handleOnScrollToIndexFailed}
      />
    </View>
  );
};

export default React.memo(DeliveryPointsList);
