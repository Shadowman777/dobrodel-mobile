import React, {Dispatch, SetStateAction} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Portal} from '@gorhom/portal';

import AppButton from 'components/app/AppButton/AppButton';

import {deleteDeliveryZone} from 'store/slices/shopSlice/shopThunks';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const DeleteZoneModal: React.FC<{
  isDeleteZoneModal: boolean;
  setDeleteZoneModal: Dispatch<SetStateAction<boolean>>;
  id_delivery_zone: number;
}> = ({isDeleteZoneModal, setDeleteZoneModal, id_delivery_zone}) => {
  const dispatch = useDispatch();

  const deleteZone = (): void => {
    dispatch(deleteDeliveryZone(id_delivery_zone));
  };

  const closeDeleteModal = (): void => {
    setDeleteZoneModal(false);
  };

  return (
    <Portal>
      <Modal
        isVisible={isDeleteZoneModal}
        hasBackdrop
        swipeDirection="down"
        onBackdropPress={closeDeleteModal}
        onSwipeComplete={closeDeleteModal}
        onBackButtonPress={closeDeleteModal}
        style={appStyles.modalWindow}>
        <View style={styles.deleteModal}>
          <View style={appStyles.modalTopLine} />
          <Text style={appStyles.modalTitle}>Удалить адрес?</Text>
          <View style={appStyles.modalButtonsContainer}>
            <AppButton
              title="Нет"
              onPress={closeDeleteModal}
              backgroundColor="#e9e9e9"
              titleColor="#929393"
            />
            <View style={{width: '100%', marginLeft: 10}}>
              <AppButton title="Да" onPress={deleteZone} />
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default DeleteZoneModal;
