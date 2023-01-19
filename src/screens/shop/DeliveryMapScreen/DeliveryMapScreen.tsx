import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  StatusBar,
  View,
  Text,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {useDebounce} from 'use-debounce';
import Config from 'react-native-config';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import {Portal} from '@gorhom/portal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import AgreementModal from './components/AgreementModal/AgreementModal';
import DeliveryZoneModal from './components/DeliveryZoneModal/DeliveryZoneModal';
import DeliveryPointsList from './components/DeliveryPointsList/DeliveryPointsList';
import UserLocationButton from './components/UserLocationButton/UserLocationButton';
import MapPoints from './components/MapPoints/MapPoints';

import {useAppSelector} from 'hooks/appHooks';
import {
  getDeliveryPoints,
  getActiveZones,
  getUserAddress,
  saveDeliveryZone,
} from 'store/slices/shopSlice/shopThunks';
import {setRouteGeometry} from 'store/slices/profileSlice/profileSlice';
import {
  setDeliveryPoints,
  setDeliveryZone,
  setCartButtonVisible,
  clearUserAddress,
} from 'store/slices/shopSlice/shopSlice';
import {setOrderStarted} from 'store/slices/profileSlice/profileSlice';
import {
  AppDeliveryZone,
  DeliveryPointExtended,
  DeliveryZone,
} from 'types/shop/shopTypes';

import UserLocation from 'assets/icons/userLocation.svg';

import {getCoordinates} from 'utils/helpers';

import AnalyticsService from 'services/AnalyticsService';
import MapService from 'services/shop/MapService';
import LocationService from 'services/LocationService';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import {routeLineStyles} from 'screens/profile/OrderRouteScreen/styles';

MapboxGL.setAccessToken(Config.MAPBOX_TOKEN);

type DeliveryMapRouteProps = {
  DeliveryMap: {
    mapType: 'zone' | 'points';
    fromCart: boolean;
    showDeliveryButton: boolean;
  };
};

const DeliveryMapScreen = () => {
  const [modalExtended, setModalExtended] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
  const [centerCoordinates, setCenterCoordinates] = useState<number[]>([
    37.6156, 55.7522,
  ]);
  const [isPointsListVisible, setPointsListVisible] = useState<boolean>(false);
  const [isBackButtonVisible, setBackButtonVisible] = useState<boolean>(false);
  const [activePointIndex, setActivePointIndex] = useState<number>(0);
  const [isZoneModalVisible, setZoneModalVisible] = useState<boolean>(false);
  const [isAgreementModalVisible, setAgreementModalVisible] =
    useState<boolean>(false);
  const [isOutOfZone, setOutOfZone] = useState<boolean>(false);

  const deliveryPointId = useAppSelector(state => state.shop.deliveryPointId);
  const deliveryZone = useAppSelector(state => state.shop.deliveryZone);
  const deliveryPoints = useAppSelector(state => state.shop.deliveryPointsList);
  const activeZones = useAppSelector(state => state.shop.activeZones);
  const userAddress = useAppSelector(state => state.shop.userAddress);
  const routeGeometry = useAppSelector(state => state.profile.routeGeometry);
  const isViewedOnboarding = useAppSelector(
    state => state.main.isViewedOnboarding,
  );
  const user = useAppSelector(state => state.auth.user);
  const userCoordinates = useAppSelector(state => state.shop.userCoordinates);
  const isAgreeWithTerms = useAppSelector(
    state => state.profile.isAgreeWithTerms,
  );
  const settings = useAppSelector(state => state.main.settings);

  const route = useRoute<RouteProp<DeliveryMapRouteProps, 'DeliveryMap'>>();
  const {mapType, fromCart, showDeliveryButton} = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const showPoints = useMemo((): boolean => {
    if (mapType === 'points' && isPointsListVisible && deliveryPoints) {
      if (
        settings &&
        settings.displaying_choice_delivery_zone_when_placing_an_order
      ) {
        return !!deliveryZone;
      }

      return true;
    }

    return false;
  }, [mapType, isPointsListVisible, deliveryPoints, settings, deliveryZone]);

  const getCurrLocation = useCallback(
    (
      changeDeliveryZone?: (
        zone: DeliveryZone | null,
        coordinates?: string,
        address?: string,
      ) => void,
    ): void => {
      Geolocation.getCurrentPosition(
        location => {
          const coordinates = [
            location.coords.longitude,
            location.coords.latitude,
          ];
          const formattedCoords = `${coordinates[1]},${coordinates[0]}`;

          if (mapType === 'zone') {
            if (changeDeliveryZone) {
              dispatch(
                getUserAddress({
                  userCoordinates: formattedCoords,
                  activeZones,
                  dispatch,
                  changeDeliveryZone,
                }),
              );
            } else {
              dispatch(
                getUserAddress({
                  userCoordinates: formattedCoords,
                  activeZones,
                  dispatch,
                }),
              );
            }
          } else {
            dispatch(
              getUserAddress({
                userCoordinates: formattedCoords,
                activeZones,
                dispatch,
                changeDeliveryZone,
              }),
            );
          }
        },
        undefined,
        {timeout: 20000},
      );
    },
    [mapType],
  );
  const changeDeliveryZone = useCallback(
    (
      zone: DeliveryZone | null,
      coordinates?: string,
      address?: string,
    ): void => {
      if (zone) {
        const payload: AppDeliveryZone = {
          address: zone.title,
          gps_coordinates: `${zone.position.lat},${zone.position.lng}`,
        };

        dispatch(setDeliveryZone(payload));
      } else {
        const payload: AppDeliveryZone = {
          address: address ? address : 'Ваш адрес',
          gps_coordinates:
            coordinates || `${centerCoordinates[1]},${centerCoordinates[0]}`,
        };

        dispatch(setDeliveryZone(payload));
      }
    },
    [centerCoordinates],
  );
  const selectDeliveryZone = useCallback((): void => {
    setZoneModalVisible(false);
    setPointsListVisible(false);

    if (deliveryZone) {
      dispatch(saveDeliveryZone(deliveryZone));
    }

    if (!isAgreeWithTerms) {
      setAgreementModalVisible(true);
    } else if (fromCart) {
      if (!user) {
        navigation.navigate('AuthNav', {
          screen: 'AuthForm',
          params: {cart: true},
        });
      } else {
        navigation.navigate('DeliveryMap', {mapType: 'points',});
      }
    } else {
      navigation.navigate('ShopNav', {screen: 'Main'});
    }

    AnalyticsService.trackEvent('select_delivery_zone');
  }, [user, deliveryZone, isAgreeWithTerms, fromCart]);
  const selectPoint = (index: number, point: DeliveryPointExtended): void => {
    if (!point) return;

    setActivePointIndex(index);
    setCenterCoordinates([
      +getCoordinates(point.gps_coordinates)[1],
      +getCoordinates(point.gps_coordinates)[0],
    ]);

    AnalyticsService.trackEvent('select_delivery_point', {
      address: point.address,
    });
  };
  const goBack = useCallback((): boolean => {
    if (mapType === 'zone') {
      if (settings && settings.show_onboarding && !isViewedOnboarding) {
        AnalyticsService.trackEvent('back_from_map_to_onboarding');
        navigation.navigate('Onboarding', {onboardingType: 'learning'});
      } else if (fromCart) {
        AnalyticsService.trackEvent('back_from_map_to_cart');
        navigation.navigate('Cart');
      } else if (deliveryZone && !isOutOfZone) {
        navigation.navigate('Main');
      } else {
        AnalyticsService.trackEvent('go_back_from_map');
        navigation.navigate('Main');
      }
    } else {
      dispatch(setOrderStarted(false));
      setPointsListVisible(false);
      dispatch(setDeliveryPoints(null));
      navigation.navigate('Cart');
    }
    setZoneModalVisible(false);

    return true;
  }, [isViewedOnboarding, settings, fromCart, deliveryZone, isOutOfZone]);

  useFocusEffect(
    React.useCallback(() => {
      setZoneModalVisible(true);
      setPointsListVisible(true);
      setBackButtonVisible(true);
      setOutOfZone(false);

      dispatch(getDeliveryPoints());
      dispatch(getActiveZones());
      dispatch(setCartButtonVisible(false));

      BackHandler.addEventListener('hardwareBackPress', goBack);

      return () => {
        dispatch(clearUserAddress());
        dispatch(setRouteGeometry(null));
        setBackButtonVisible(false);
        setPointsListVisible(false);
        setZoneModalVisible(false);

        BackHandler.removeEventListener('hardwareBackPress', goBack);
      };
    }, []),
  );

  useEffect(() => {
    if (deliveryZone) {
      setCenterCoordinates([
        +getCoordinates(deliveryZone.gps_coordinates)[1],
        +getCoordinates(deliveryZone.gps_coordinates)[0],
      ]);
      setSearchQuery(deliveryZone.address);
      !isPointsListVisible && setPointsListVisible(true);
    }
  }, [deliveryZone]);
  useEffect(() => {
    if (userAddress !== '') {
      setSearchQuery(userAddress);
    }
  }, [userAddress]);
  useEffect(() => {
    mapType === 'points' && LocationService.followUserLocation(getCurrLocation);
  }, [mapType]);
  useEffect(() => {
    if (
      mapType === 'points' &&
      deliveryPoints &&
      Object.keys(deliveryPoints).length > 0 &&
      userCoordinates
    ) {
      const points = Object.keys(deliveryPoints).map(
        key => deliveryPoints[key],
      );
      const filteredPoints = MapService.filterPoints(userCoordinates, points);
      selectPoint(0, filteredPoints[0]);
    }
  }, [mapType, deliveryPoints, userCoordinates]);
  useEffect(() => {
    if (
      mapType === 'zone' &&
      deliveryZone &&
      activeZones &&
      activeZones.length > 0
    ) {
      setOutOfZone(MapService.checkOutOfZone(deliveryZone, activeZones));
    }
  }, [mapType, deliveryZone, activeZones]);
  useEffect(() => {
    if (
      mapType === 'zone' &&
      !deliveryZone &&
      activeZones &&
      activeZones.length > 0
    ) {
      LocationService.followUserLocation(getCurrLocation);
    }
  }, [mapType, deliveryZone, activeZones]);

  return (
    <View style={appStyles.flexBlock}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <MapboxGL.MapView
        logoEnabled={false}
        localizeLabels={true}
        style={appStyles.flexBlock}>
        <MapboxGL.Camera
          centerCoordinate={centerCoordinates}
          zoomLevel={mapType === 'zone' ? 11 : 12}
        />
        {mapType === 'zone' && isOutOfZone && !modalExtended ? (
          <Portal>
            <View style={styles.deliveryZoneWarningOuter}>
              <View style={styles.deliveryZoneWarningInner}>
                <AntDesignIcons
                  name="exclamationcircleo"
                  size={20}
                  color="#e5243f"
                />
                <Text style={styles.deliveryZoneWarningText}>
                  Увы! Сюда пока не доставляем, но скоро будем!
                </Text>
              </View>
            </View>
          </Portal>
        ) : null}
        {activeZones && activeZones.length > 0
          ? activeZones.map((zone, index) => (
              <MapboxGL.ShapeSource
                id={index.toString()}
                shape={zone as any}
                key={index.toString()}>
                <MapboxGL.FillLayer
                  id={index.toString() + 1}
                  style={{fillColor: '#83e916', fillOpacity: 0.18}}
                />
              </MapboxGL.ShapeSource>
            ))
          : null}
        {mapType !== 'zone' && userCoordinates && userCoordinates.length > 0 ? (
          <MapboxGL.PointAnnotation
            id={new Date().toTimeString()}
            coordinate={userCoordinates}>
            <View style={styles.userZoneMarkerOuter}>
              <View style={styles.userZoneMarkerInner} />
            </View>
          </MapboxGL.PointAnnotation>
        ) : null}
        {mapType !== 'zone' && routeGeometry ? (
          <MapboxGL.ShapeSource
            id={'lineString'}
            shape={routeGeometry.geometry as any}>
            <MapboxGL.LineLayer id={'line'} style={routeLineStyles} />
          </MapboxGL.ShapeSource>
        ) : null}
        {settings &&
        (settings.selection_delivery_zone_first_login_after_registration ||
          settings.displaying_choice_delivery_zone_when_placing_an_order) ? (
          <MapboxGL.PointAnnotation
            id={new Date().toTimeString()}
            coordinate={
              deliveryZone && mapType === 'points'
                ? [
                    +getCoordinates(deliveryZone.gps_coordinates)[1],
                    +getCoordinates(deliveryZone.gps_coordinates)[0],
                  ]
                : centerCoordinates
            }>
            <UserLocation />
          </MapboxGL.PointAnnotation>
        ) : null}
        {showPoints ? (
          <MapPoints
            userCoordinates={userCoordinates}
            deliveryPoints={Object.keys(deliveryPoints!).map(
              key => deliveryPoints![key],
            )}
            activePointIndex={activePointIndex}
            selectPoint={selectPoint}
          />
        ) : null}
        <Portal>
          {isBackButtonVisible && !modalExtended && !deliveryPointId ? (
            <TouchableOpacity
              onPress={goBack}
              style={styles.backButtonContainer}>
              <Ionicons name="ios-arrow-back" size={25} color="#212429" />
            </TouchableOpacity>
          ) : null}
        </Portal>
      </MapboxGL.MapView>

      {mapType === 'zone' && isZoneModalVisible ? (
        <>
          <DeliveryZoneModal
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            modalExtended={modalExtended}
            setModalExtended={setModalExtended}
            debouncedSearchQuery={debouncedSearchQuery}
            changeDeliveryZone={changeDeliveryZone}
            selectDeliveryZone={selectDeliveryZone}
            isOutOfZone={isOutOfZone}
          />
          {!modalExtended ? (
            <UserLocationButton
              followUserLocation={() =>
                LocationService.followUserLocation(
                  getCurrLocation(changeDeliveryZone),
                )
              }
            />
          ) : null}
        </>
      ) : null}
      {showPoints ? (
        <DeliveryPointsList
          selectPoint={selectPoint}
          userCoordinates={userCoordinates}
          setCenterCoordinates={setCenterCoordinates}
          deliveryPoints={Object.keys(deliveryPoints!).map(
            key => deliveryPoints![key],
          )}
          setPointsListVisible={setPointsListVisible}
          activePointIndex={activePointIndex}
          setActivePointIndex={setActivePointIndex}
          showDeliveryButton={showDeliveryButton}
        />
      ) : null}
      <AgreementModal
        isAgreementModalVisible={isAgreementModalVisible}
        setAgreementModalVisible={setAgreementModalVisible}
        setPointsListVisible={setPointsListVisible}
        fromCart={fromCart}
      />
    </View>
  );
};

export default DeliveryMapScreen;
