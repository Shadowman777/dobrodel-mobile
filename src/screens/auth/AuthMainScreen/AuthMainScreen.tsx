import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import AppButton from 'components/app/AppButton/AppButton';
import Info from 'assets/icons/info.svg';

import {setCartButtonVisible} from 'store/slices/shopSlice/shopSlice';

import axios from 'axios';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const AuthMainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setCartButtonVisible(false));
      axios.defaults.headers.common.Authorization = '';
    }, []),
  );

  return (
    <View style={[appStyles.grow, styles.container]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={[appStyles.grow, appStyles.flexCenter]}>
        <View
          style={[appStyles.grow, appStyles.flexCenter, styles.topContainer]}>
          <Text style={[appStyles.appTitle, appStyles.textCenter]}>
            Опа! Вам необходимо войти
          </Text>
          <Text style={[appStyles.appSubtitle, appStyles.textCenter]}>
            Чтобы совершить покупки, нужно войти в аккаунт
          </Text>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Войти по телефону"
              onPress={() => navigation.navigate('AuthForm')}
            />
          </View>
        </View>
      </View>
      <View style={appStyles.alignCenter}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Feedback')}
          style={{...appStyles.alignCenterRow, marginBottom: 30}}>
          <Info />
          <Text style={styles.feedbackLinkText}>Служба поддержки</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthMainScreen;
