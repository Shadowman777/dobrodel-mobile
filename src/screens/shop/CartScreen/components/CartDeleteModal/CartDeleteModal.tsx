import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Portal} from '@gorhom/portal';

import AppButton from 'components/app/AppButton/AppButton';

import {useAppSelector} from 'hooks/appHooks';
import {clearCart} from 'store/slices/shopSlice/shopThunks';
import {setShowCartDelete} from 'store/slices/shopSlice/shopSlice';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const CartDeleteModal = () => {
  const showCartDelete = useAppSelector(state => state.shop.showCartDelete);
  const dispatch = useDispatch();

  const deleteCart = (): void => {
    dispatch(clearCart());
    dispatch(setShowCartDelete(false));
  };
  const closeDeleteModal = (): void => {
    dispatch(setShowCartDelete(false));
  };

  return (
    <Portal>
      <Modal
        isVisible={showCartDelete}
        hasBackdrop
        swipeDirection="down"
        onBackdropPress={closeDeleteModal}
        onSwipeComplete={closeDeleteModal}
        onBackButtonPress={closeDeleteModal}
        style={appStyles.modalWindow}>
        <View style={styles.deleteModal}>
          <View style={appStyles.modalTopLine} />
          <Text style={appStyles.modalTitle}>Удалить товары из корзины?</Text>
          <View style={appStyles.modalButtonsContainer}>
            <AppButton
              title="Нет, спасибо"
              onPress={() => dispatch(setShowCartDelete(false))}
              backgroundColor="#e9e9e9"
              titleColor="#929393"
            />
            <View style={{width: '100%', marginLeft: 10}}>
              <AppButton title="Да" onPress={deleteCart} />
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default CartDeleteModal;
