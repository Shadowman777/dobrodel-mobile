import {useCallback, useRef, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {Modalize} from 'react-native-modalize';

const useModal = <T extends number | null>(
  showVariable: T,
  setShowVariable?: ActionCreatorWithPayload<T>,
  setCartButtonVisible?: ActionCreatorWithPayload<boolean>,
  fromCart?: boolean,
) => {
  const modalRef = useRef<Modalize>(null);

  const dispatch = useDispatch();

  const eraseData = useCallback((): void => {
    // @ts-ignore
    dispatch(setShowVariable(null));
  }, []);

  const handleAppStateChange = useCallback(
    (nextAppState: string): void => {
      if (nextAppState === 'inactive' || nextAppState === 'background') {
        eraseData();
      }
    },
    [eraseData],
  );

  const handleBackButtonPress = useCallback((): boolean => {
    eraseData();

    return true;
  }, []);

  useEffect(() => {
    if (showVariable !== null) {
      modalRef.current?.open();
      if (setCartButtonVisible) {
        dispatch(setCartButtonVisible(false));
      }
    } else {
      modalRef.current?.close();
      if (setCartButtonVisible && !fromCart) {
        dispatch(setCartButtonVisible(true));
      }
    }
  }, [showVariable, setCartButtonVisible, fromCart]);

  return {
    modalRef,
    handleAppStateChange,
    handleBackButtonPress,
    eraseData,
  };
};

export default useModal;
