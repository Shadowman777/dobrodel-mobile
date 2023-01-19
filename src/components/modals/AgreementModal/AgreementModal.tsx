import React, {Dispatch, SetStateAction} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Portal} from '@gorhom/portal';

import AppButton from 'components/app/AppButton/AppButton';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';
import styles from './styles';

interface IAgreementModal {
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  title: string;
}

const AgreementModal: React.FC<IAgreementModal> = props => {
  const closeModal = (): void => {
    props.setVisible(false);
  };

  return (
    <Portal>
      <Modal
        isVisible={props.isVisible}
        hasBackdrop
        swipeDirection="down"
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        onBackButtonPress={closeModal}
        style={appStyles.modalWindow}>
        <View style={styles.deleteModal}>
          <View style={appStyles.modalTopLine} />
          <Text style={appStyles.modalTitle}>{props.title}</Text>
          <View
            style={[
              appStyles.modalButtonsContainer,
              {width: constants.screen.width * 0.8},
            ]}>
            <View style={{width: '100%'}}>
              <AppButton title="Ок" onPress={closeModal} />
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default AgreementModal;
