import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

import AppStartButtons from 'components/app/AppStartButtons/AppStartButtons';
import OnboardingPagination from 'screens/main/OnboardingScreen/components/OnboardingPagination/OnboardingPagination';

import {useAppSelector} from 'hooks/appHooks';
import {setViewedOnboarding} from 'store/slices/mainSlice/mainSlice';

import AnalyticsService from 'services/AnalyticsService';

import onboardingStyles from 'assets/styles/onboardingStyles';
import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const GreetingScreen = () => {
  const settings = useAppSelector(state => state.main.settings);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const checkOnboardingInSettings = useCallback(() => {
    return settings?.show_onboarding;
  }, [settings]);

  const closeGreeting = useCallback((): void => {
    AnalyticsService.trackEvent('close_onboarding_from_start_slide').then();

    dispatch(setViewedOnboarding(true));

    if (settings?.show_onboarding) {
      navigation.navigate('Onboarding');
    } else if (settings?.authorization_required) {
      navigation.navigate('AuthNav', {screen: 'AuthForm'});
    } else {
      navigation.navigate('ShopNav', {screen: 'Main'});
    }
  }, [settings]);

  useEffect(() => {
    AnalyticsService.trackEvent('start_slide_open').then();
  }, []);

  return (
    <SafeAreaView edges={['top']} style={appStyles.grow}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <OnboardingPagination
        closeOnboarding={closeGreeting}
        activeSlide={0}
        slidesNumber={0}
        scenePercent={0}
        isOnboarding={false}
      />
      <View style={onboardingStyles.onboardingSlide}>
        <Text style={onboardingStyles.slideTitle}>
          Спасибо за установку нашего приложения
        </Text>
        <Text style={onboardingStyles.startSlideSubtitle}>
          Товары без наценки{'\n'}за супермаркет{'\n'}уже ждут вас
        </Text>
        <FastImage
          source={require('assets/images/onboarding/onboarding-start-img.png')}
          resizeMode={FastImage.resizeMode.contain}
          style={onboardingStyles.onboardingStartImage}
        />
        <Text style={styles.greetingText}>
          И это еще не все,{'\n'}мы подготовили для вас приветственный бонус
          {'\n'}
          на первую покупку!
        </Text>
        <AppStartButtons
          topButtonText="Зарегистрироваться"
          topButtonRoute={{stack: 'AuthNav', screen: 'AuthForm'}}
          bottomButtonText={
            checkOnboardingInSettings() ? 'Как это работает?' : 'Войти'
          }
          bottomButtonRoute={
            checkOnboardingInSettings()
              ? 'Onboarding'
              : {stack: 'AuthNav', screen: 'AuthForm'}
          }
          settings={settings}
        />
      </View>
    </SafeAreaView>
  );
};

export default GreetingScreen;
