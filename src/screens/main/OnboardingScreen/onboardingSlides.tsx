import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

import styles from 'assets/styles/onboardingStyles';
import appStyles from 'assets/styles/appStyles';

const {width} = Dimensions.get('window');

export const slides = [
  {
    title: (
      <Text style={[styles.slideTitle, {paddingTop: width < 333 ? 23 : 43}]}>
        Как оформить заказ?
      </Text>
    ),
    subTitle: (
      <View style={{marginVertical: width < 333 ? 7 : 14}}>
        <Text
          style={[
            styles.slideSubtitle,
            styles.slideMarkedText,
            {alignSelf: 'flex-start'},
          ]}>
          Выберите товар и
        </Text>
        <Text
          style={[
            styles.slideSubtitle,
            styles.slideMarkedText,
            {alignSelf: 'flex-start'},
          ]}>
          добавьте его в корзину
        </Text>
      </View>
    ),
    description: (
      <Text style={[styles.slideSecondaryText, {fontWeight: '700'}]}>
        Самые свежие товары каждый день
      </Text>
    ),
    image: (
      <FastImage
        source={require('assets/images/onboarding/onboarding-1-img.png')}
        resizeMode={FastImage.resizeMode.contain}
        style={{height: 255, marginTop: width < 333 ? 0 : 12, width: '100%'}}
      />
    ),
  },
  {
    subTitle: (
      <Text style={[styles.slideSubtitle, {top: 26}]}>
        Чтобы{' '}
        <Text style={[styles.slideSubtitle, styles.slideMarkedText]}>
          оформить заказ,
        </Text>
        {'\n'}перейдите в корзину
      </Text>
    ),
    image: (
      <MaskedView
        style={appStyles.flexBlock}
        maskElement={
          <LinearGradient
            style={appStyles.flexBlock}
            colors={['transparent', '#000']}
            locations={[0.05, 0.245]}
          />
        }>
        <FastImage
          source={require('assets/images/onboarding/onboarding-2-img.png')}
          resizeMode={FastImage.resizeMode.contain}
          style={[styles.slideImage, {marginTop: -210}]}
        />
      </MaskedView>
    ),
  },
  {
    subTitle: (
      <Text style={[styles.slideSubtitle, {lineHeight: 26, marginTop: 18}]}>
        Чтобы выбрать пункт{'\n'}выдачи заказа, нажмите на{'\n'}кнопку{' '}
        <Text style={[styles.slideSubtitle, styles.slideMarkedText]}>
          «Купить сейчас»
        </Text>
        {'\n'}
        внизу корзины
      </Text>
    ),
    image: (
      <MaskedView
        style={appStyles.flexBlock}
        maskElement={
          <LinearGradient
            style={appStyles.flexBlock}
            colors={['transparent', '#000']}
            locations={[0.07, 0.245]}
          />
        }>
        <FastImage
          source={require('assets/images/onboarding/onboarding-3-img.png')}
          resizeMode={FastImage.resizeMode.contain}
          style={[styles.slideImage, {marginTop: -210}]}
        />
      </MaskedView>
    ),
  },
  {
    subTitle: (
      <Text style={[styles.slideSubtitle, {lineHeight: 26, zIndex: 999}]}>
        Выберите на карте{'\n'}
        <Text style={[styles.slideSubtitle, styles.slideMarkedText]}>
          мобильный пункт выдачи,
        </Text>
        {'\n'}в котором хотите{'\n'}
        забрать заказ
      </Text>
    ),
    description: (
      <Text style={[styles.slideSecondaryText, {marginTop: 12}]}>
        Обратите внимание на удаленность от вашего дома и график доставки
      </Text>
    ),
    image: (
      <MaskedView
        style={styles.slideImage}
        maskElement={
          <LinearGradient
            style={styles.slideImage}
            colors={['#000', 'transparent']}
            locations={[0.3, 0.7]}
          />
        }>
        <FastImage
          source={require('assets/images/onboarding/onboarding-4-img.png')}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.slideImage}
        />
      </MaskedView>
    ),
  },
  {
    subTitle: (
      <Text style={[styles.slideSubtitle, {top: 26, lineHeight: 26}]}>
        <Text style={[styles.slideSubtitle, styles.slideMarkedText]}>
          Выберите день и
        </Text>
        {'\n'}
        <Text style={[styles.slideSubtitle, styles.slideMarkedText]}>
          временной интервал в
        </Text>
        {'\n'}который хотите забрать{'\n'}заказ
      </Text>
    ),
    image: (
      <MaskedView
        style={appStyles.flexBlock}
        maskElement={
          <LinearGradient
            style={appStyles.flexBlock}
            colors={['transparent', '#000']}
            locations={[0, 0.35]}
          />
        }>
        <FastImage
          source={require('assets/images/onboarding/onboarding-5-img.png')}
          resizeMode={FastImage.resizeMode.contain}
          style={[styles.slideImage, {marginTop: -239}]}
        />
      </MaskedView>
    ),
  },
  {
    subTitle: (
      <Text style={[styles.slideSubtitle, {lineHeight: 26}]}>
        Укажите контактные{'\n'}данные для отправки{'\n'}чека и нажмите{'\n'}
        <Text style={[styles.slideSubtitle, styles.slideMarkedText]}>
          «Завершить заказ»,
        </Text>
        {'\n'}
        чтобы перейти к оплате{'\n'}заказа
      </Text>
    ),
    image: (
      <MaskedView
        style={styles.slideImage}
        maskElement={
          <LinearGradient
            style={styles.slideImage}
            colors={['#000', 'transparent']}
            locations={[0.3, 0.6]}
          />
        }>
        <FastImage
          source={require('assets/images/onboarding/onboarding-6-img.png')}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.slideImage}
        />
      </MaskedView>
    ),
  },
  {
    subTitle: (
      <Text
        style={[
          styles.slideSubtitle,
          {alignSelf: 'flex-start', lineHeight: 26},
        ]}>
        <Text style={[styles.slideSubtitle, styles.slideMarkedText]}>
          Оплатите заказ
        </Text>{' '}
        и{'\n'}ожидайте уведомления{'\n'}о готовности заказа{'\n'}к выдаче
      </Text>
    ),
    image: (
      <FastImage
        source={require('assets/images/onboarding/onboarding-7-img.png')}
        resizeMode={FastImage.resizeMode.contain}
        style={{height: 214, marginBottom: 40, width: 244}}
      />
    ),
  },
  {
    subTitle: (
      <Text style={[styles.slideSubtitle, {lineHeight: 26}]}>
        <Text style={[styles.slideSubtitle, styles.slideMarkedText]}>
          Оплатите заказ
        </Text>{' '}
        и{'\n'}ожидайте уведомления{'\n'}о готовности заказа{'\n'}к выдаче
      </Text>
    ),
    image: (
      <FastImage
        source={require('assets/images/onboarding/onboarding-7-img.png')}
        resizeMode={FastImage.resizeMode.contain}
        style={{height: 214, marginBottom: 40, width: 244}}
      />
    ),
  },
  {
    subTitle: (
      <Text style={[styles.slideSubtitle, {lineHeight: 26, marginLeft: 15}]}>
        Спасибо!{'\n'}А теперь бонусы
      </Text>
    ),
    image: (
      <FastImage
        source={require('assets/images/onboarding/onboarding-9-img.png')}
        resizeMode={FastImage.resizeMode.contain}
        style={{height: 140, marginVertical: 25, width: 223}}
      />
    ),
  },
];
