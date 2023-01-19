import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import useModal from 'hooks/sharedHooks/useModal';
import {View, Text, InteractionManager, AppState} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import {Portal} from '@gorhom/portal';
import FastImage from 'react-native-fast-image';
import ShadowView from 'react-native-shadow-view';
import Config from 'react-native-config';

import AppLoading from 'components/app/AppLoading/AppLoading';
import AppButton from 'components/app/AppButton/AppButton';

import {useAppSelector} from 'hooks/appHooks';
import {setActionId} from 'store/slices/actionsSlice/actionsSlice';
import {setCartButtonVisible} from 'store/slices/shopSlice/shopSlice';
import {getAction} from 'store/slices/actionsSlice/actionsThunks';

import {navigate} from 'navigation/RootNavigation';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const ActionModal = () => {
  const [actionImage, setActionImage] = useState<string | null>(null);

  const actionId = useAppSelector(state => state.actions.actionId);
  const action = useAppSelector(state => state.actions.action);
  const actionLoading = useAppSelector(state => state.loading.actionLoading);

  const {modalRef, handleBackButtonPress, handleAppStateChange, eraseData} =
    useModal(actionId, setActionId, setCartButtonVisible);

  const dispatch = useDispatch();

  const goToAction = useCallback((): void => {
    if (actionId) {
      navigate('ActionProducts', {id_news: actionId});
      dispatch(setActionId(null));
    }
  }, [actionId]);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (actionId) {
        dispatch(getAction(actionId));
      }

      AppState.addEventListener('change', handleAppStateChange);

      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    });
  }, [handleAppStateChange, actionId]);

  useEffect(() => {
    if (action && action.image_url) {
      setActionImage(action.image_url);
    } else {
      setActionImage(null);
    }
  }, [action]);

  const modalContent = (
    <View style={styles.container}>
      <View style={appStyles.modalTopLine} />
      <View style={styles.actionContent}>
        {actionLoading ? (
          <AppLoading />
        ) : (
          <>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.actionTopContainer}
              style={appStyles.flexBlock}>
              {actionImage !== null ? (
                <View style={appStyles.alignCenter}>
                  <FastImage
                    source={{
                      uri: `${Config.STATIC_URL}${actionImage}`,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode="cover"
                    style={styles.actionImage}
                  />
                </View>
              ) : null}
              <View style={styles.actionTitleWrapper}>
                <Text style={styles.actionTitle}>{action && action.title}</Text>
              </View>
              <View style={styles.actionDescriptionWrapper}>
                <Text style={styles.actionDescription}>
                  {action && action.description}
                </Text>
              </View>
            </ScrollView>
          </>
        )}
      </View>
      <ShadowView style={styles.actionBottomContainer}>
        <View style={styles.actionButtonWrapper}>
          <AppButton
            onPress={goToAction}
            title="На страницу акции"
            paddingVertical={15}
            fontSize={16}
            lineHeight={19}
          />
        </View>
      </ShadowView>
    </View>
  );

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        onClosed={eraseData}
        onBackButtonPress={handleBackButtonPress}
        onOverlayPress={eraseData}
        handleStyle={{display: 'none'}}
        adjustToContentHeight
        rootStyle={appStyles.modalWindow}>
        {modalContent}
      </Modalize>
    </Portal>
  );
};

export default ActionModal;
