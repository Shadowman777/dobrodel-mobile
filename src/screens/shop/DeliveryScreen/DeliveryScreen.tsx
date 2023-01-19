import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, ScrollView, StatusBar} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import DropdownPicker, {ValueType} from 'react-native-dropdown-picker';

import AppButton from 'components/app/AppButton/AppButton';
import DeliveryTimeIntervals from './components/DeliveryTimeIntervals/DeliveryTimeIntervals';

import {
  setDeliveryPoint,
  setDeliveryPoints,
  setDeliveryPointDate,
  setDeliveryPointPickup,
} from 'store/slices/shopSlice/shopSlice';
import {DeliveryPointExtended} from 'types/shop/shopTypes';

import Location from 'assets/icons/location.svg';
import Calendar from 'assets/icons/calendar.svg';

import AnalyticsService from 'services/AnalyticsService';
import {formatDate, getTimePeriod} from 'utils/helpers';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import constants from 'assets/styles/constants';

type DeliveryScreenRouteProp = {
  Delivery: {
    deliveryPoint: DeliveryPointExtended;
  };
};

const DeliveryScreen = () => {
  const [deliveryDateId, setDeliveryDateId] = useState<ValueType | null>(null);
  const [datePickup, setDatePickup] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [isHintVisible, setHintVisible] = useState<boolean>(false);

  const route = useRoute<RouteProp<DeliveryScreenRouteProp, 'Delivery'>>();
  const {deliveryPoint} = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const dateDeliveryCheck = useCallback((): boolean => {
    return (
      deliveryPoint !== null &&
      deliveryDateId !== null &&
      deliveryPoint.date_delivery &&
      deliveryPoint.date_delivery.filter(
        item => item.id === deliveryDateId,
      )[0] !== undefined
    );
  }, [deliveryPoint, deliveryDateId]);

  const handleContinue = useCallback((): void => {
    dispatch(setDeliveryPoint(deliveryPoint));
    dispatch(setDeliveryPointDate(deliveryDateId as number | null));
    dispatch(setDeliveryPointPickup(datePickup));
    dispatch(setDeliveryPoints(null));

    navigation.navigate('ProfileNav', {screen: 'Formalization'});
  }, [deliveryPoint, deliveryDateId, datePickup]);

  const deliveryDatesItems = useMemo(() => {
    if (!deliveryPoint) {
      return [];
    }

    return deliveryPoint.date_delivery.map(date => {
      return {
        label: `${formatDate(date.date_start).formattedDate} / ${
          formatDate(date.date_start).day
        } ${getTimePeriod(date.date_start, date.date_end)}`,
        value: date.id,
      };
    });
  }, [deliveryPoint]);

  const deliveryHint = (
    <View style={styles.deliveryHintWrapper}>
      <Text style={styles.deliveryHintText}>
        Выберите удобный для Вас день и временной интервал, в который вы желаете
        получить Ваш заказ.
      </Text>
      <View style={styles.deliveryHintTextBottom}>
        <Text style={styles.deliveryHintText}>
          Мобильный пункт выдачи будет ждать Вас в назначенное время, и водитель
          бережно передаст Ваш заказ. Для удобства нахождения пункта выдачи
          воспользуйтесь функцией "Построить маршрут" на странице вашего заказа.
        </Text>
      </View>
    </View>
  );

  useEffect(() => {
    if (datePickup.length > 0) {
      AnalyticsService.trackEvent('select_delivery_time', {
        time: datePickup,
      });
    }
  }, [datePickup]);
  useEffect(() => setHintVisible(deliveryDateId === null), [deliveryDateId]);

  if (!deliveryPoint) {
    return null;
  }

  const datesDropdown = (
    <DropdownPicker
      open={open}
      value={deliveryDateId}
      items={deliveryDatesItems}
      setValue={setDeliveryDateId}
      setOpen={setOpen}
      style={{
        borderColor: open ? constants.colors.primary : '#929393',
        borderRadius: open ? 25 : 100,
      }}
      listMode="SCROLLVIEW"
      containerStyle={appStyles.dropdownWrapper}
      dropDownContainerStyle={appStyles.dropdownContainer}
      placeholder="Выберите дату выдачи"
      placeholderStyle={styles.dropdownPlaceholder}
    />
  );

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        barStyle="dark-content"
      />

      <View style={appStyles.flexBlock}>
        <View style={styles.deliverySection}>
          <View style={appStyles.alignCenterRow}>
            <Location />
            <Text style={styles.deliverySectionTitle}>Адрес пункта выдачи</Text>
          </View>
          <Text style={styles.deliverySectionSubtitle}>
            {deliveryPoint.address}
          </Text>
        </View>
        <View style={[styles.deliverySection, styles.deliveryDatesSection]}>
          <View style={appStyles.alignCenterRow}>
            <Calendar />
            <Text style={styles.deliverySectionTitle}>
              Укажите дату выдачи заказа
            </Text>
          </View>
          <Text style={styles.deliverySectionSecondarySubtitle}>
            Выберите день и временной интервал
          </Text>
        </View>
        {datesDropdown}
        {isHintVisible ? deliveryHint : null}
        {deliveryDateId ? (
          <DeliveryTimeIntervals
            datePickup={datePickup}
            setDatePickup={setDatePickup}
            dateDeliveryCheck={dateDeliveryCheck}
            deliveryPoint={deliveryPoint}
            deliveryDateId={deliveryDateId}
          />
        ) : null}
      </View>
      <View style={[appStyles.alignCenter, styles.buttonContainer]}>
        <View style={styles.buttonInnerContainer}>
          <AppButton
            title="Продолжить"
            onPress={handleContinue}
            disabled={!deliveryDateId}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DeliveryScreen;
