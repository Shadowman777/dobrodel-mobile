import React, {Dispatch, SetStateAction} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Portal} from '@gorhom/portal';

import AppButton from 'components/app/AppButton/AppButton';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import constants from 'assets/styles/constants';

interface IOrderCancelModal {
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onCloseModal: () => void;
}

const OrderCancelModal: React.FC<IOrderCancelModal> = props => {
  return (
    <Portal>
      <Modal
        hasBackdrop
        isVisible={props.isVisible}
        onBackdropPress={() => props.setVisible(false)}
        onBackButtonPress={() => props.setVisible(false)}
        onSwipeComplete={() => props.setVisible(false)}
        swipeDirection="down"
        style={appStyles.modalWindow}>
        <View style={styles.modalContainer}>
          <View style={appStyles.modalTopLine} />
          <View style={{width: constants.screen.width * 0.9}}>
            <Text style={appStyles.modalTitle}>
              Вы уверены, что хотите отменить заказ?
            </Text>
          </View>
          <View style={appStyles.modalButtonsContainer}>
            <View
              style={[
                appStyles.appButtonShadow,
                {width: constants.screen.width * 0.36},
              ]}>
              <AppButton
                title="Да"
                onPress={props.onCloseModal}
                backgroundColor="#fff"
                borderColor="#007abc"
              />
            </View>
            <View
              style={[
                appStyles.appButtonShadow,
                styles.modalRightButtonWrapper,
              ]}>
              <AppButton
                buttonShadow
                title="Нет"
                onPress={() => props.setVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default OrderCancelModal;
