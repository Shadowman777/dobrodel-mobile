import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity, View, Text, Keyboard} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppLoading from 'components/app/AppLoading/AppLoading';

import {useAppSelector} from 'hooks/appHooks';
import {
  setPromoCode,
  setPromoCodeError,
} from 'store/slices/shopSlice/shopSlice';
import {checkPromoCode, getCart} from 'store/slices/shopSlice/shopThunks';

import AnalyticsService from 'services/AnalyticsService';

import styles from './styles';
import constants from 'assets/styles/constants';

const PromoCodeInput = () => {
  const cart = useAppSelector(state => state.shop.cart);
  const promoCode = useAppSelector(state => state.shop.promoCode);
  const promoCodeError = useAppSelector(state => state.shop.promoCodeError);
  const mainLoading = useAppSelector(state => state.loading.mainLoading);

  const promoCodeLabelColor = promoCodeError
    ? '#fa5051'
    : constants.colors.primaryText;
  const promoCodeBorder = promoCodeError ? '#fa5051' : '#e9e9e9';
  const isDisabled = !promoCode || promoCode.length === 0 || mainLoading;

  const dispatch = useDispatch();

  const changeText = (e: string): void => {
    promoCodeError && dispatch(setPromoCodeError(''));

    if (cart && cart.discount_promo_code) {
      dispatch(getCart());
    }

    dispatch(setPromoCode(e));
  };
  const checkCode = useCallback((): void => {
    if (promoCodeError) {
      dispatch(setPromoCodeError(''));
    }
    Keyboard.dismiss();
    dispatch(checkPromoCode(promoCode));
  }, [promoCode]);

  const getRightComponent = useCallback((): JSX.Element | undefined => {
    if (mainLoading) {
      return (
        <AppLoading
          loading={mainLoading}
          height={30}
          marginRight={-30}
          width={30}
        />
      );
    } else if (cart && cart.discount_promo_code) {
      return (
        <View style={styles.checkIconContainer}>
          <Ionicons name="ios-checkmark-sharp" size={30} color="#0eb44d" />
        </View>
      );
    }

    return undefined;
  }, [cart, mainLoading]);

  const handleFocus = useCallback(() => {
    AnalyticsService.trackEvent('promo_code_focus');
    if (promoCodeError) {
      dispatch(setPromoCodeError(''));
    }
  }, [promoCodeError]);

  const handleBlur = useCallback(() => {
    if (promoCode && promoCode.length > 0) {
      AnalyticsService.trackEvent('promo_code_input');
    }
  }, [promoCode]);

  return (
    <View style={styles.promoCodeOuterWrapper}>
      <Text style={[styles.promoCodeLabel, {color: promoCodeLabelColor}]}>
        Промокод
      </Text>
      <View style={styles.promoCodeInnerWrapper}>
        <FloatingLabelInput
          value={promoCode}
          onChangeText={changeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          label=""
          staticLabel
          hint="Введите промокод"
          hintTextColor="#929393"
          rightComponent={getRightComponent()}
          inputStyles={styles.promoInput}
          containerStyles={{
            ...styles.promoInputContainer,
            borderColor: promoCodeBorder,
          }}
        />
        {cart && !cart.discount_promo_code ? (
          <TouchableOpacity
            disabled={isDisabled}
            onPress={checkCode}
            style={{
              ...styles.continueButton,
              backgroundColor: isDisabled
                ? '#e9e9e9'
                : constants.colors.primary,
            }}>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={17}
              color="#333"
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {promoCodeError ? (
        <Text style={styles.promoCodeErrorText}>{promoCodeError}</Text>
      ) : null}
    </View>
  );
};

export default PromoCodeInput;
