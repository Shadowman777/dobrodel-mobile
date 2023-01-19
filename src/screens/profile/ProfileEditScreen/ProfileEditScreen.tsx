import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, ScrollView, StatusBar} from 'react-native';

import ProfileEditForm from './components/ProfileEditForm/ProfileEditForm';
import ProfileEditAddress from './components/ProfileEditAddress/ProfileEditAddress';
import DeleteZoneModal from './components/DeleteZoneModal/DeleteZoneModal';
import TelegramModal from 'components/modals/TelegramModal/TelegramModal';
import AppButton from 'components/app/AppButton/AppButton';

import {useAppSelector} from 'hooks/appHooks';
import {setTelegramLink} from 'store/slices/authSlice/authSlice';
import {linkTelegram} from 'store/slices/authSlice/authThunks';

import LinkingService from 'services/LinkingService';

import styles from './styles';

const ProfileEditScreen = () => {
  const [isDeleteZoneModal, setDeleteZoneModal] = useState<boolean>(false);
  const [isTelegramModalVisible, setTelegramModalVisible] =
    useState<boolean>(false);

  const deliveryZone = useAppSelector(state => state.shop.deliveryZone);
  const telegramLink = useAppSelector(state => state.auth.telegramLink);
  const telegramLinked = useAppSelector(state => state.auth.telegramLinked);
  const buttonLoading = useAppSelector(state => state.loading.buttonLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (telegramLink) {
      goToTelegram().then();
    }
  }, [telegramLink]);

  const goToTelegram = useCallback(async (): Promise<void> => {
    if (telegramLink) {
      await LinkingService.goToUrl(telegramLink);
      dispatch(setTelegramLink(null));
    }
  }, [telegramLink]);

  const renderTelegramModalButton = (): JSX.Element => {
    const buttonTitle = telegramLinked
      ? 'Отвязать Telegram'
      : 'Привязать Telegram';
    const buttonAction = telegramLinked
      ? () => setTelegramModalVisible(true)
      : () => dispatch(linkTelegram());

    return (
      <View style={styles.telegramButton}>
        <AppButton
          onPress={buttonAction}
          title={buttonTitle}
          backgroundColor="#fff"
          borderColor="#007abc"
          buttonShadow
          loading={buttonLoading}
          disabled={buttonLoading}
        />
      </View>
    );
  };

  return (
    <ScrollView
      bounces={false}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.profileEditWrapper}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <ProfileEditForm />
      {deliveryZone ? (
        <>
          <ProfileEditAddress
            deliveryZone={deliveryZone}
            setDeleteZoneModal={setDeleteZoneModal}
          />
          <DeleteZoneModal
            isDeleteZoneModal={isDeleteZoneModal}
            setDeleteZoneModal={setDeleteZoneModal}
            id_delivery_zone={deliveryZone.id!}
          />
        </>
      ) : null}
      {renderTelegramModalButton()}
      <TelegramModal
        type="unlink"
        isModalVisible={isTelegramModalVisible}
        setModalVisible={setTelegramModalVisible}
      />
    </ScrollView>
  );
};

export default ProfileEditScreen;
