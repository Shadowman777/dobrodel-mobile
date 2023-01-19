import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {InteractionManager, TouchableOpacity, View} from 'react-native';
import {useRoute, useFocusEffect, RouteProp} from '@react-navigation/native';
import Config from 'react-native-config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import {Portal} from '@gorhom/portal';
import Ionicons from 'react-native-vector-icons/Ionicons';

import OrderRouteInfo from './components/OrderRouteInfo/OrderRouteInfo';

import {useAppSelector} from 'hooks/appHooks';
import {DeliveryPoint} from 'types/shop/shopTypes';
import {setRouteGeometry} from 'store/slices/profileSlice/profileSlice';
import {getRoute} from 'store/slices/profileSlice/profileThunks';

import DeliveryPointMarker from 'assets/icons/deliveryPoint.svg';

import {getCoordinates} from 'utils/helpers';
import DropdownAlertService from 'services/DropdownAlertService';
import LocationService from 'services/LocationService';

import appStyles from 'assets/styles/appStyles';
import {styles, routeLineStyles} from './styles';
import constants from 'assets/styles/constants';

MapboxGL.setAccessToken(Config.MAPBOX_TOKEN);

type OrderRouteProps = {
  OrderRoute: {
    order_delivery_point: DeliveryPoint;
  };
};

const OrderRouteScreen = () => {
  const [userLocation, setUserLocation] = useState<string>();
  const routeGeometry = useAppSelector(state => state.profile.routeGeometry);

  const route = useRoute<RouteProp<OrderRouteProps, 'OrderRoute'>>();
  const order_delivery_point = route.params.order_delivery_point;

  const dispatch = useDispatch();

  const getCurrLocation = (): void => {
    Geolocation.getCurrentPosition(
      location => {
        const loc = `${location.coords.longitude},${location.coords.latitude}`;

        setUserLocation(loc);
      },
      error => DropdownAlertService.alert('error', error.message),
      {timeout: 20000},
    );
  };
  const showRoute = (trafficType: string): void => {
    if (userLocation && userLocation.length > 0) {
      const coordinates = `${order_delivery_point.gps_coordinates
        .split(',')
        .reverse()
        .join(',')};${userLocation}`;
      dispatch(getRoute({coordinates, traffic: trafficType}));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        LocationService.followUserLocation(getCurrLocation);
      });

      return () => dispatch(setRouteGeometry(null));
    }, []),
  );

  return (
    <View style={appStyles.flexBlock}>
      {userLocation && userLocation.length > 0 ? (
        <MapboxGL.MapView
          localizeLabels
          logoEnabled={false}
          style={appStyles.flexBlock}>
          <MapboxGL.Camera
            centerCoordinate={[
              +getCoordinates(userLocation)[0],
              +getCoordinates(userLocation)[1],
            ]}
            zoomLevel={11}
          />
          <MapboxGL.PointAnnotation
            id={new Date().toTimeString()}
            coordinate={[
              +getCoordinates(userLocation)[0],
              +getCoordinates(userLocation)[1],
            ]}>
            <View style={styles.deliveryZoneMarkerOuter}>
              <View style={styles.deliveryZoneMarkerInner} />
            </View>
          </MapboxGL.PointAnnotation>
          <MapboxGL.PointAnnotation
            id={new Date().toTimeString() + 1}
            coordinate={[
              +getCoordinates(order_delivery_point.gps_coordinates)[1],
              +getCoordinates(order_delivery_point.gps_coordinates)[0],
            ]}>
            <DeliveryPointMarker width={38} height={38} />
          </MapboxGL.PointAnnotation>
          {routeGeometry ? (
            <>
              <MapboxGL.ShapeSource
                id={new Date().toTimeString() + 2}
                shape={routeGeometry.geometry as any}>
                <MapboxGL.LineLayer
                  id={new Date().toTimeString() + 3}
                  style={routeLineStyles}
                />
              </MapboxGL.ShapeSource>
              <OrderRouteInfo
                duration={routeGeometry.duration}
                distance={routeGeometry.distance}
                address={order_delivery_point.address}
              />
            </>
          ) : null}
          {userLocation ? (
            <Portal>
              <View style={styles.routeButtonsContainer}>
                <TouchableOpacity
                  onPress={() => showRoute('walking')}
                  style={[
                    styles.routeButton,
                    {borderBottomLeftRadius: 8, borderTopLeftRadius: 8},
                  ]}>
                  <Ionicons
                    name="ios-walk-outline"
                    size={22}
                    color={constants.colors.primaryText}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => showRoute('driving-traffic')}
                  style={[
                    styles.routeButton,
                    {
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                      borderRightWidth: 0,
                    },
                  ]}>
                  <Ionicons
                    name="ios-car-sport"
                    size={22}
                    color={constants.colors.primaryText}
                  />
                </TouchableOpacity>
              </View>
            </Portal>
          ) : null}
        </MapboxGL.MapView>
      ) : null}
    </View>
  );
};

export default OrderRouteScreen;
