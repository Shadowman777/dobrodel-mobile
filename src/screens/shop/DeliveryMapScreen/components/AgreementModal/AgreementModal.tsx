import React, {useCallback, Dispatch, SetStateAction} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {Portal} from '@gorhom/portal';

import AppButton from 'components/app/AppButton/AppButton';

import {useAppSelector} from 'hooks/appHooks';
import {setAgreeWithTerms} from 'store/slices/profileSlice/profileSlice';

import AnalyticsService from 'services/AnalyticsService';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

interface IAgreementModalProps {
  isAgreementModalVisible: boolean;
  setAgreementModalVisible: Dispatch<SetStateAction<boolean>>;
  setPointsListVisible: Dispatch<SetStateAction<boolean>>;
  fromCart: boolean;
}

const AgreementModal: React.FC<IAgreementModalProps> = ({
  isAgreementModalVisible,
  setAgreementModalVisible,
  setPointsListVisible,
  fromCart,
}) => {
  const user = useAppSelector(state => state.auth.user);
  const deliveryZone = useAppSelector(state => state.shop.deliveryZone);
  const isViewedOnboarding = useAppSelector(
    state => state.main.isViewedOnboarding,
  );
  const isAgreeWithTerms = useAppSelector(
    state => state.profile.isAgreeWithTerms,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const agreeWithTerms = useCallback((): void => {
    dispatch(setAgreeWithTerms(true));
    setAgreementModalVisible(false);
    AnalyticsService.trackEvent('agree_with_terms');

    if (isViewedOnboarding) {
      if (fromCart) {
        if (!user) {
          navigation.navigate('AuthNav', {
            screen: 'AuthForm',
            params: {cart: true},
          });
        } else {
          setPointsListVisible(true);
          navigation.navigate('DeliveryMap', {mapType: 'points',});
        }
      } else {
        navigation.navigate('Main');
      }
    } else {
      navigation.navigate('Onboarding', {onboardingType: 'learning'});
    }
  }, [fromCart, isViewedOnboarding, user]);

  return (
    <Portal>
      <Modal
        isVisible={
          deliveryZone !== null && !isAgreeWithTerms && isAgreementModalVisible
        }
        hasBackdrop
        onBackdropPress={agreeWithTerms}
        style={appStyles.modalWindow}>
        <View style={styles.contentContainer}>
          <View style={appStyles.modalTopLine} />
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Согласие на обработку данных</Text>
          </View>
          <View style={[appStyles.alignCenterRow, styles.modalContainer]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Page', {type: 'personal_data'})
              }>
              <Text style={[styles.subtitle, styles.subtitleLink]}>
                Согласие
              </Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>на обработку данных</Text>
          </View>
          <View style={styles.buttonContainer}>
            <AppButton title="Согласен" onPress={agreeWithTerms} />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default AgreementModal;
