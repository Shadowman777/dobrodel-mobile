import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

import AppStartButtons from 'components/app/AppStartButtons/AppStartButtons';

import {useAppSelector} from 'hooks/appHooks';

import OnboardingBg from 'assets/images/onboarding/onboarding-bg.svg';

import onboardingStyles from 'assets/styles/onboardingStyles';
import styles from './styles';
import appStyles from 'assets/styles/appStyles';

const {width} = Dimensions.get('window');

interface IOnboardingSlideProps {
  index: number;
  title?: JSX.Element;
  subTitle?: JSX.Element;
  description?: JSX.Element;
  descriptionSecondary?: JSX.Element;
  background?: JSX.Element;
  image?: JSX.Element;
  clearSceneInterval: () => void;
}

const OnboardingSlide: React.FC<IOnboardingSlideProps> = props => {
  const user = useAppSelector(state => state.auth.user);
  const settings = useAppSelector(state => state.main.settings);

  const slideButtons = user ? (
    <AppStartButtons
      topButtonText="Перейти в каталог"
      topButtonRoute={{stack: 'ShopNav', screen: 'Main'}}
      clearSceneInterval={props.clearSceneInterval}
      type="onboarding"
    />
  ) : (
    <AppStartButtons
      topButtonText="Зарегистрироваться"
      topButtonRoute={{stack: 'AuthNav', screen: 'AuthForm'}}
      bottomButtonText="Перейти в каталог"
      bottomButtonRoute={{
        stack: settings?.authorization_required ? 'AuthNav' : 'ShopNav',
        screen: settings?.authorization_required ? 'AuthForm' : 'Main',
      }}
      clearSceneInterval={props.clearSceneInterval}
      type="onboarding"
    />
  );

  const slides = [
    <View style={[onboardingStyles.onboardingSlide, {overflow: 'hidden'}]}>
      <View>
        {props.title!}
        {props.subTitle!}
        {props.description!}
        {props.image!}
      </View>
      {slideButtons}
    </View>,
    <View style={onboardingStyles.onboardingSlide}>
      <View style={appStyles.flexBlock}>
        {props.subTitle!}
        {props.image!}
      </View>
      {slideButtons}
    </View>,
    <View style={onboardingStyles.onboardingSlide}>
      {props.subTitle!}
      {props.image!}
      {slideButtons}
    </View>,
    <View style={onboardingStyles.onboardingSlide}>
      <View style={[appStyles.flexBlock, {position: 'relative', top: -150}]}>
        {props.image!}
        <View style={{top: -310}}>
          {props.subTitle!}
          {props.description!}
        </View>
      </View>
      {slideButtons}
    </View>,
    <View style={onboardingStyles.onboardingSlide}>
      {props.subTitle!}
      {props.image!}
      {slideButtons}
    </View>,
    <View style={onboardingStyles.onboardingSlide}>
      <View style={[appStyles.flexBlock, {position: 'relative', top: -240}]}>
        {props.image!}
        <View style={{top: -280}}>{props.subTitle!}</View>
      </View>
      {slideButtons}
    </View>,
    <View style={onboardingStyles.onboardingSlide}>
      <View style={styles.slideBackgroundImage}>
        <OnboardingBg width={width} />
      </View>
      <View style={styles.orderSlideWrapper}>
        {props.image!}
        {props.subTitle!}
      </View>
      {slideButtons}
    </View>,
    <View
      style={[onboardingStyles.onboardingSlide, styles.specialSlideWrapper]}>
      <View style={styles.zoneSlideWrapper}>
        <FastImage
          source={require('assets/images/onboarding/onboarding-8-online.png')}
          style={{flex: 1.14}}
          resizeMode={FastImage.resizeMode.stretch}>
          <Text
            style={[
              onboardingStyles.slideSubtitle,
              styles.specialSlideTitleTop,
            ]}>
            Выбирай{'\n'}онлайн
          </Text>
        </FastImage>
        <FastImage
          source={require('assets/images/onboarding/onboarding-8-offline.png')}
          style={{flex: 2}}
          resizeMode={FastImage.resizeMode.contain}>
          <Text
            style={[
              onboardingStyles.slideSubtitle,
              styles.specialSlideTitleBottom,
            ]}>
            Забирай{'\n'}офлайн
          </Text>
        </FastImage>
        <View style={styles.specialSlideButtons}>{slideButtons}</View>
      </View>
    </View>,
    <View style={onboardingStyles.onboardingSlide}>
      <View style={styles.slideBackgroundImage}>
        <OnboardingBg width={width} />
      </View>
      <View style={{marginBottom: 'auto'}}>
        {props.image!}
        {props.subTitle!}
        {user ? (
          <Text
            style={[
              onboardingStyles.slideSecondaryText,
              {fontWeight: '700', marginLeft: 15, marginVertical: 27},
            ]}>
            <Text
              style={[
                onboardingStyles.slideSecondaryText,
                onboardingStyles.slideMarkedText,
              ]}>
              Получите 3 бесплатные доставки
            </Text>{' '}
            без{'\n'}минимальной суммы заказа
          </Text>
        ) : (
          <Text
            style={[
              onboardingStyles.slideSecondaryText,
              {fontWeight: '700', marginLeft: 15, marginVertical: 27},
            ]}>
            Зарегистрируйтесь и{'\n'}
            <Text
              style={[
                onboardingStyles.slideSecondaryText,
                onboardingStyles.slideMarkedText,
              ]}>
              получите 3 бесплатные доставки
            </Text>{' '}
            без{'\n'}минимальной суммы заказа
          </Text>
        )}
      </View>
      {slideButtons}
    </View>,
  ];

  return slides[props.index];
};

export default OnboardingSlide;
