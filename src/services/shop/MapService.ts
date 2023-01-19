import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import {
  ActiveZone,
  AppDeliveryZone,
  DeliveryPointExtended,
} from 'types/shop/shopTypes';

import {getCoordinates, getDistanceBetweenPoints} from 'utils/helpers';

const turfHelpers = require('@turf/helpers');

class MapService {
  static filterPoints(
    userCoordinates: number[],
    points: DeliveryPointExtended[],
  ): DeliveryPointExtended[] {
    if (!userCoordinates || userCoordinates.length === 0) return [];

    return points.sort((a, b) => {
      const firstDistance = getDistanceBetweenPoints(
        [+userCoordinates[0], +userCoordinates[1]],
        [
          +getCoordinates(a.gps_coordinates)[1],
          +getCoordinates(a.gps_coordinates)[0],
        ],
      );
      const secondDistance = getDistanceBetweenPoints(
        [userCoordinates[0], userCoordinates[1]],
        [
          +getCoordinates(b.gps_coordinates)[1],
          +getCoordinates(b.gps_coordinates)[0],
        ],
      );

      return firstDistance > secondDistance ? 1 : -1;
    });
  }

  static checkOutOfZone(
    deliveryZone: AppDeliveryZone,
    activeZones: ActiveZone[],
  ): boolean {
    const coordinates = getCoordinates(deliveryZone.gps_coordinates);
    const point = turfHelpers.point([+coordinates[1], +coordinates[0]]);
    let outOfPolygon = true;

    activeZones.forEach(zone => {
      let polygon = null;
      if (zone.type === 'Polygon') {
        polygon = turfHelpers.polygon(zone.coordinates);
      } else if (zone.type === 'MultiPolygon') {
        polygon = turfHelpers.multiPolygon(zone.coordinates);
      }

      if (booleanPointInPolygon(point, polygon)) {
        outOfPolygon = false;
      }
    });

    return outOfPolygon;
  }
}

export default MapService;
