import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import {DeliveryPointExtended} from 'types/shop/shopTypes';

import {getCoordinates} from 'utils/helpers';
import MapService from 'services/shop/MapService';

import DeliveryPointMarker from 'assets/icons/deliveryPoint.svg';

interface IMapPoints {
  userCoordinates: number[];
  deliveryPoints: DeliveryPointExtended[];
  activePointIndex: number;
  selectPoint: (index: number, point: DeliveryPointExtended) => void;
}

const MapPoints: React.FC<IMapPoints> = ({
  deliveryPoints,
  activePointIndex,
  selectPoint,
  userCoordinates,
}) => {
  let filteredPoints: DeliveryPointExtended[] = MapService.filterPoints(
    userCoordinates,
    deliveryPoints,
  );

  if (!filteredPoints || filteredPoints.length === 0) {
    return null;
  }

  return (
    <>
      {filteredPoints.map((point, index) => (
        <MapboxGL.PointAnnotation
          key={point.id.toString()}
          id={point.id.toString()}
          coordinate={[
            +getCoordinates(point.gps_coordinates)[1],
            +getCoordinates(point.gps_coordinates)[0],
          ]}
          onSelected={() => selectPoint(index, point)}>
          <DeliveryPointMarker
            width={index === activePointIndex ? 48 : 38}
            height={index === activePointIndex ? 48 : 38}
          />
        </MapboxGL.PointAnnotation>
      ))}
    </>
  );
};

export default MapPoints;
