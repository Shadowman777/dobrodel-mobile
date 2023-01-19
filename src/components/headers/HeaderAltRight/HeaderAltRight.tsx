import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity, Text, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HeaderRightDemo from 'components/headers/HeaderRightDemo/HeaderRightDemo';

import {useAppSelector} from 'hooks/appHooks';
import {setShowCartDelete} from 'store/slices/shopSlice/shopSlice';

import appStyles from 'assets/styles/appStyles';
import styles from 'components/headers/styles';
import customStyles from './styles';

const HeaderAltRight: React.FC<{
  type?: string;
  order?: boolean;
  auth?: boolean;
}> = ({type = '', order = false, auth = false}) => {
  const cart = useAppSelector(state => state.shop.cart);
  const settings = useAppSelector(state => state.main.settings);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  let buttonContent: JSX.Element | null;
  switch (type) {
    case 'cart':
      buttonContent =
        cart && cart.basket ? (
          <Text
            style={[
              customStyles.headerOnboardingText,
              {
                marginBottom: Platform.OS === 'ios' ? 12 : 0,
                marginRight: -15,
                fontWeight: '700',
              },
            ]}>
            Очистить
          </Text>
        ) : null;
      break;
    default:
      buttonContent = <Ionicons name="ios-close" size={30} color="#212429" />;
  }
  const handlePressButton = (): void => {
    if (type === 'cart') {
      dispatch(setShowCartDelete(true));
    } else if (type === 'order') {
      navigation.navigate('Orders');
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      {settings && settings.demo_mode ? (
        <HeaderRightDemo
          top={!cart && !order && !auth ? -13 : undefined}
          left={!cart && !order && !auth ? -5 : undefined}
        />
      ) : null}
      <TouchableOpacity
        onPress={handlePressButton}
        style={{
          ...(type !== 'cart' && styles.headerIconContainer),
          ...appStyles.flexCenter,
          marginRight: 20,
          width: type === 'cart' ? '100%' : undefined,
        }}>
        {buttonContent}
      </TouchableOpacity>
    </>
  );
};

export default HeaderAltRight;
