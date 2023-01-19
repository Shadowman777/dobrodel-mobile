import React, {useEffect, useState, Dispatch, SetStateAction} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import {Portal} from '@gorhom/portal';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';

import {useAppSelector} from 'hooks/appHooks';
import {setDeliveryZones} from 'store/slices/shopSlice/shopSlice';
import {searchDeliveryZones} from 'store/slices/shopSlice/shopThunks';

import {SearchDeliveryZonesPayload} from 'store/slices/shopSlice/types';
import {DeliveryZone} from 'types/shop/shopTypes';

import AnalyticsService from 'services/AnalyticsService';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import constants from 'assets/styles/constants';

const {height, width} = Dimensions.get('window');

const DeliveryZoneModal: React.FC<{
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  modalExtended: boolean;
  setModalExtended: Dispatch<SetStateAction<boolean>>;
  debouncedSearchQuery: string;
  changeDeliveryZone: (zone: DeliveryZone | null) => void;
  selectDeliveryZone: () => void;
  isOutOfZone: boolean;
}> = ({
  searchQuery,
  setSearchQuery,
  debouncedSearchQuery,
  modalExtended,
  setModalExtended,
  changeDeliveryZone,
  selectDeliveryZone,
  isOutOfZone,
}) => {
  const [modalHeight, setModalHeight] = useState<number | string>(
    height * 0.22,
  );

  const deliveryZones = useAppSelector(state => state.shop.deliveryZones);

  const dispatch = useDispatch();

  const closeModal = (): void => {
    AnalyticsService.trackEvent('enter_delivery_zone_address_finish');
    setModalHeight(height * 0.22);
    setModalExtended(false);
    Keyboard.dismiss();
  };
  const searchDeliveryZone = (): void => {
    const payload: SearchDeliveryZonesPayload = {
      text: debouncedSearchQuery,
    };

    dispatch(searchDeliveryZones(payload));
  };
  const pickDeliveryZone = (dZone: DeliveryZone): void => {
    setSearchQuery(dZone.title);
    changeDeliveryZone(dZone);
    closeModal();
  };
  const handleFocus = (): void => {
    AnalyticsService.trackEvent('enter_delivery_zone_address');

    if (modalHeight !== '100%') {
      setModalHeight('100%');
      setModalExtended(true);
    }
  };

  useEffect(() => {
    if (
      modalExtended &&
      debouncedSearchQuery !== '' &&
      debouncedSearchQuery.length >= 3
    ) {
      searchDeliveryZone();
    } else {
      dispatch(setDeliveryZones([]));
    }
  }, [debouncedSearchQuery]);

  const RightButton = () => (
    <TouchableOpacity
      onPress={() => setSearchQuery('')}
      style={styles.zoneInputClearContainer}>
      <AntIcons name="close" size={22} color="#c9c9c9" />
    </TouchableOpacity>
  );

  return (
    <Portal>
      <View style={{...styles.deliveryZoneModal, height: modalHeight}}>
        {!modalExtended ? (
          <View style={appStyles.alignCenter}>
            <View style={appStyles.modalTopLine} />
            <View style={{width: width * 0.9}}>
              <Text
                style={{
                  ...appStyles.modalTitle,
                  marginVertical: 12,
                  textAlign: 'left',
                }}>
                Зона доставки
              </Text>
            </View>
          </View>
        ) : (
          <View style={{...styles.backContainer, width: width * 0.9}}>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons
                name="ios-arrow-back"
                color={constants.colors.primaryText}
                size={22}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={{...appStyles.alignCenterRow, width: width * 0.9}}>
          <FloatingLabelInput
            value={searchQuery}
            onChangeText={e => setSearchQuery(e)}
            onFocus={handleFocus}
            label=""
            staticLabel
            hint="Введите свой адрес"
            hintTextColor="#929393"
            rightComponent={modalExtended ? <RightButton /> : undefined}
            inputStyles={
              modalExtended ? styles.zoneActiveInput : styles.zoneInput
            }
            containerStyles={
              modalExtended
                ? styles.zoneInputActiveContainer
                : styles.zoneInputContainer
            }
          />
          {!modalExtended && (
            <TouchableOpacity
              disabled={!searchQuery || searchQuery.length < 3 || isOutOfZone}
              onPress={selectDeliveryZone}
              style={{
                ...styles.continueButton,
                backgroundColor:
                  !searchQuery || searchQuery.length < 3 || isOutOfZone
                    ? '#e9e9e9'
                    : constants.colors.primary,
              }}>
              <Ionicons
                name="ios-chevron-forward-outline"
                size={17}
                color="#333"
              />
            </TouchableOpacity>
          )}
        </View>
        {modalExtended && deliveryZones && deliveryZones.length > 0 ? (
          <FlatList
            data={deliveryZones}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => pickDeliveryZone(item)}
                style={{width: width * 0.9, marginVertical: 15}}>
                <Text style={{color: constants.colors.primaryText}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        ) : null}
      </View>
    </Portal>
  );
};

export default DeliveryZoneModal;
