import React, {useEffect, useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import useModal from 'hooks/sharedHooks/useModal';
import {View, Text, InteractionManager, AppState} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import {Portal} from '@gorhom/portal';
import FastImage from 'react-native-fast-image';
import ShadowView from 'react-native-shadow-view';
import Config from 'react-native-config';

import AppLoading from 'components/app/AppLoading/AppLoading';
import AppButton from 'components/app/AppButton/AppButton';

import {useAppSelector} from 'hooks/appHooks';
import {
  setDeliveryPoint,
  setDeliveryPointId,
} from 'store/slices/shopSlice/shopSlice';
import {getDeliveryPointInfo} from 'store/slices/shopSlice/shopThunks';

import {IFormattedDate} from 'types/main/mainTypes';

import LinkingService from 'services/LinkingService';

import {navigate} from 'navigation/RootNavigation';
import {formatDate} from 'utils/helpers';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const DeliveryPointModal = () => {
  const [formattedTimes, setFormattedTimes] = useState<string[]>([]);
  const [deliveryPointDates, setDeliveryPointDates] = useState<
    IFormattedDate[]
  >([]);
  const deliveryPointId = useAppSelector(state => state.shop.deliveryPointId);
  const isDeliveryPointButtonVisible = useAppSelector(
    state => state.shop.isDeliveryPointButtonVisible,
  );
  const detailedDeliveryPoint = useAppSelector(
    state => state.shop.detailedDeliveryPoint,
  );
  const deliveryPointLoading = useAppSelector(
    state => state.loading.deliveryPointLoading,
  );
  const userCoordinates = useAppSelector(state => state.shop.userCoordinates);

  const {modalRef, handleBackButtonPress, handleAppStateChange, eraseData} =
    useModal(deliveryPointId, setDeliveryPointId);

  const dispatch = useDispatch();

  const goToDelivery = useCallback((): void => {
    if (deliveryPointId) {
      navigate('Delivery', {deliveryPoint: detailedDeliveryPoint});
      dispatch(setDeliveryPointId(null));
    }
  }, [deliveryPointId]);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (deliveryPointId) {
        dispatch(getDeliveryPointInfo(deliveryPointId));
      }

      AppState.addEventListener('change', handleAppStateChange);

      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    });
  }, [handleAppStateChange, deliveryPointId]);

  useEffect(() => {
    if (
      detailedDeliveryPoint &&
      detailedDeliveryPoint.date_delivery &&
      detailedDeliveryPoint.date_delivery.length > 0
    ) {
      const formattedDates = detailedDeliveryPoint.date_delivery
        .slice(0, 3)
        .map(date => {
          return formatDate(date.date_start);
        });
      const formattedDateTimes = detailedDeliveryPoint.date_delivery
        .slice(0, 2)
        .map(date => {
          return `${date.date_start
            .split(' ')[1]
            .slice(0, -3)} - ${date.date_end.split(' ')[1].slice(0, -3)}`;
        });

      setFormattedTimes(formattedDateTimes);
      setDeliveryPointDates(formattedDates);
    }
  }, [detailedDeliveryPoint]);

  useEffect(() => {
    return () => {
      dispatch(setDeliveryPoint(null));
    };
  }, []);

  const deliveryPointPhoto = (img: string, key: string, isSingle?: boolean) => (
    <FastImage
      source={{
        uri: `${Config.STATIC_URL}${img}`,
        priority: FastImage.priority.high,
      }}
      resizeMode={FastImage.resizeMode.cover}
      style={{
        ...styles.deliveryPointImage,
        ...(isSingle ? styles.deliveryPointImageFull : {}),
      }}
      key={key}
    />
  );

  const renderPointPhoto = (images: string[]): JSX.Element => (
    <>
      {images.length > 1 ? (
        <ScrollView
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {images.map(img =>
            deliveryPointPhoto(img, `image-${+new Date() + Math.random()}`),
          )}
        </ScrollView>
      ) : (
        deliveryPointPhoto(
          images[0],
          `image-${+new Date() + Math.random()}`,
          true,
        )
      )}
    </>
  );

  const modalContent = (
    <View style={styles.container}>
      <View style={appStyles.modalTopLine} />
      <View>
        <View style={styles.deliveryPointContent}>
          {deliveryPointLoading ? (
            <AppLoading />
          ) : (
            <>
              <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {detailedDeliveryPoint &&
                detailedDeliveryPoint.images &&
                detailedDeliveryPoint.images.length > 0
                  ? renderPointPhoto(detailedDeliveryPoint.images)
                  : null}
                <View style={styles.deliveryPointTitleWrapper}>
                  <Text style={styles.deliveryPointTitle}>
                    {detailedDeliveryPoint && detailedDeliveryPoint.name}
                  </Text>
                </View>
                {detailedDeliveryPoint && detailedDeliveryPoint.address ? (
                  <View>
                    <Text style={styles.deliveryPointAddressText}>
                      {detailedDeliveryPoint.address}
                    </Text>
                  </View>
                ) : null}
                <View style={styles.deliveryPointDatesWrapper}>
                  <View style={styles.deliveryPointDatesTimes}>
                    <Text style={styles.deliveryPointSubtitle}>
                      Время выдачи
                    </Text>
                    {formattedTimes.length > 0
                      ? formattedTimes.map(time => (
                          <Text style={styles.deliveryPointDatesTimeText}>
                            {time}
                          </Text>
                        ))
                      : null}
                  </View>
                  <View style={styles.deliveryPointDates}>
                    <Text style={styles.deliveryPointSubtitle}>
                      Даты выдачи
                    </Text>
                    {deliveryPointDates.length > 0
                      ? deliveryPointDates.map(date => (
                          <Text
                            key={`${date}${Math.random()}`}
                            style={styles.deliveryPointDatesText}>
                            {date.day} {date.formattedDate}
                          </Text>
                        ))
                      : null}
                  </View>
                </View>
                {detailedDeliveryPoint && detailedDeliveryPoint.description ? (
                  <View style={styles.deliveryPointDescriptionWrapper}>
                    <Text style={styles.deliveryPointDescription}>
                      {detailedDeliveryPoint.description}
                    </Text>
                  </View>
                ) : null}
              </ScrollView>
            </>
          )}
        </View>
      </View>
      <ShadowView style={styles.deliveryPointBottomContainer}>
        {isDeliveryPointButtonVisible ? (
          <View style={styles.deliveryPointButtonWrapper}>
            <AppButton
              onPress={goToDelivery}
              title="Доставить сюда"
              buttonShadow
              paddingVertical={15}
            />
          </View>
        ) : null}
        {detailedDeliveryPoint && detailedDeliveryPoint.gps_coordinates ? (
          <View
            style={{
              ...styles.deliveryPointButtonWrapper,
              marginTop: isDeliveryPointButtonVisible ? 0 : 7,
            }}>
            <AppButton
              title="Построить маршрут"
              buttonShadow
              onPress={() =>
                LinkingService.buildRoute(
                  detailedDeliveryPoint?.gps_coordinates,
                  userCoordinates.join(','),
                  detailedDeliveryPoint?.address,
                )
              }
            />
          </View>
        ) : null}
      </ShadowView>
    </View>
  );

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        onClosed={eraseData}
        onBackButtonPress={handleBackButtonPress}
        onOverlayPress={eraseData}
        handleStyle={{display: 'none'}}
        rootStyle={appStyles.modalWindow}
        adjustToContentHeight>
        {modalContent}
      </Modalize>
    </Portal>
  );
};

export default DeliveryPointModal;
