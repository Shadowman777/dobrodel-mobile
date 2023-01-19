import React, {useCallback, Dispatch, SetStateAction} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {Portal} from '@gorhom/portal';

import AppButton from 'components/app/AppButton/AppButton';

import {useAppSelector} from 'hooks/appHooks';
import {setLogged} from 'store/slices/authSlice/authSlice';
import {linkTelegram, unlinkTelegram} from 'store/slices/authSlice/authThunks';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';
import styles from './styles';

type TelegramModalType = 'link' | 'unlink';

interface ITelegramModal {
  type: TelegramModalType;
  isModalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const TelegramModal: React.FC<ITelegramModal> = props => {
  const buttonLoading = useAppSelector(state => state.loading.buttonLoading);
  const settings = useAppSelector(state => state.main.settings);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const modalTitle =
    props.type === 'link'
      ? 'Подключите Telegram аккаунт, чтобы авторизация проходила через него.'
      : 'Вы уверены, что хотите отвязать Telegram аккаунт?';
  const modalHeight =
    props.type === 'link'
      ? constants.screen.height * 0.32
      : constants.screen.height * 0.26;

  const closeTelegramModal = (): void => {
    props.setModalVisible(false);
  };

  const closeAndLogin = useCallback((): void => {
    closeTelegramModal();

    if (settings?.authorization_required) {
      dispatch(setLogged(true));
    } else {
      navigation.navigate('ShopNav', {screen: 'Main'});
    }
  }, [settings]);

  const handleUnlinkTelegram = (): void => {
    dispatch(unlinkTelegram());
    closeTelegramModal();
  };

  const renderLinkTelegramButtons = (): JSX.Element => (
    <>
      <View style={[styles.modalButton, {marginRight: 10}]}>
        <AppButton
          onPress={() => dispatch(linkTelegram())}
          title="Подключить"
          loading={buttonLoading}
          disabled={buttonLoading}
          buttonShadow
        />
      </View>
      <View style={styles.modalButton}>
        <AppButton
          title="Нет"
          onPress={closeAndLogin}
          backgroundColor="#fff"
          borderColor="#007abc"
          buttonShadow
        />
      </View>
    </>
  );

  const renderUnlinkTelegramButtons = (): JSX.Element => (
    <>
      <View style={[styles.modalButton, {marginRight: 10}]}>
        <AppButton
          onPress={closeAndLogin}
          title="Нет"
          loading={buttonLoading}
          disabled={buttonLoading}
          buttonShadow
        />
      </View>
      <View style={styles.modalButton}>
        <AppButton
          title="Да"
          onPress={handleUnlinkTelegram}
          backgroundColor="#fff"
          borderColor="#007abc"
          buttonShadow
        />
      </View>
    </>
  );

  return (
    <Portal>
      <Modal
        hasBackdrop
        isVisible={props.isModalVisible}
        swipeDirection="down"
        onBackdropPress={closeAndLogin}
        onSwipeComplete={closeAndLogin}
        onBackButtonPress={closeAndLogin}
        style={appStyles.modalWindow}>
        <View style={[styles.modalContainer, {height: modalHeight}]}>
          <View style={appStyles.modalTopLine} />
          <View style={{width: constants.screen.width * 0.9}}>
            <Text style={appStyles.modalTitle}>{modalTitle}</Text>
          </View>
          <View style={appStyles.modalButtonsContainer}>
            {props.type === 'link'
              ? renderLinkTelegramButtons()
              : renderUnlinkTelegramButtons()}
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default TelegramModal;
