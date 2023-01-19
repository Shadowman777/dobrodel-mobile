import React, {useCallback, Dispatch, SetStateAction} from 'react';
import {View, Platform, Text} from 'react-native';
import Modal from 'react-native-modal';
import Config from 'react-native-config';
import {Portal} from '@gorhom/portal';

import AppButton from 'components/app/AppButton/AppButton';

import {useAppSelector} from 'hooks/appHooks';

import LinkingService from 'services/LinkingService';

import {APP_VERSION} from 'assets/styles/constants';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const AppUpdateModal: React.FC<{
  isUpdateVisible: boolean;
  setUpdateVisible: Dispatch<SetStateAction<boolean>>;
}> = ({isUpdateVisible, setUpdateVisible}) => {
  const settings = useAppSelector(state => state.main.settings);

  const checkAppVersions = useCallback((): boolean => {
    if (settings?.application_version) {
      const settingsVersion = +settings.application_version.split('.').join('');
      const appVersion = +APP_VERSION.split('.').join('');

      return appVersion < settingsVersion;
    }

    return false;
  }, [settings]);

  const checkUpdateForcedType = useCallback((): boolean => {
    return (
      settings !== null &&
      settings.application_type_update &&
      settings.application_type_update === 'forced'
    );
  }, [settings]);

  const updateApp = async (): Promise<void> => {
    const downloadLink =
      Platform.OS === 'ios' ? Config.APP_APPLE_LINK : Config.APP_GOOGLE_LINK;
    await LinkingService.goToUrl(downloadLink);
  };

  const closeUpdateModal = (): void | null => {
    if (checkUpdateForcedType()) return null;
    setUpdateVisible(false);
  };

  return (
    <Portal>
      <Modal
        isVisible={checkAppVersions() && isUpdateVisible}
        hasBackdrop
        swipeDirection="down"
        onBackdropPress={closeUpdateModal}
        onBackButtonPress={closeUpdateModal}
        onSwipeComplete={closeUpdateModal}
        style={appStyles.modalWindow}>
        <View style={styles.contentContainer}>
          <View style={appStyles.modalTopLine} />
          <View style={styles.modalContainer}>
            <Text style={appStyles.modalTitle}>
              Ваша версия приложения устарела
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton title="Обновить приложение" onPress={updateApp} />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default AppUpdateModal;
