import React, {Dispatch, SetStateAction} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {Portal} from '@gorhom/portal';

import AppButton from 'components/app/AppButton/AppButton';

import {setDeliveryPoint} from 'store/slices/shopSlice/shopSlice';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';
import styles from './styles';

interface IZoneDeleteModalProps {
  isModalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const ZoneDeleteModal: React.FC<IZoneDeleteModalProps> = ({
  isModalVisible,
  setModalVisible,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const clearDeliveryZone = (): void => {
    dispatch(setDeliveryPoint(null));
    setModalVisible(false);
    navigation.navigate('DeliveryMap', {mapType: 'zone'});
  };
  const closeZoneDeleteModal = (): void => {
    setModalVisible(false);
  };

  return (
    <Portal>
      <Modal
        isVisible={isModalVisible}
        hasBackdrop
        swipeDirection="down"
        onBackdropPress={closeZoneDeleteModal}
        onSwipeComplete={closeZoneDeleteModal}
        onBackButtonPress={closeZoneDeleteModal}
        style={appStyles.modalWindow}>
        <View style={styles.modalContainer}>
          <View style={appStyles.modalTopLine} />
          <View style={{width: constants.screen.width * 0.9}}>
            <Text style={appStyles.modalTitle}>
              Вы действительно хотите сменить зону доставки?
            </Text>
          </View>
          <View style={appStyles.modalButtonsContainer}>
            <View style={appStyles.appButtonShadow}>
              <AppButton
                title="Нет"
                onPress={closeZoneDeleteModal}
                backgroundColor="#e9e9e9"
                titleColor="#929393"
              />
            </View>
            <View
              style={[
                appStyles.appButtonShadow,
                appStyles.modalRightButtonWrapper,
              ]}>
              <AppButton title="Да" onPress={clearDeliveryZone} />
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ZoneDeleteModal;
