import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  StatusBar,
  InteractionManager,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import AppButton from 'components/app/AppButton/AppButton';

import {useAppSelector} from 'hooks/appHooks';
import {setCartButtonVisible} from 'store/slices/shopSlice/shopSlice';
import {setViewedOnboarding} from 'store/slices/mainSlice/mainSlice';

import Watch from 'assets/icons/watch.svg';
import Location from 'assets/icons/location.svg';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const HowItWorksScreen = () => {
  const settings = useAppSelector(state => state.main.settings);
  const deliveryZone = useAppSelector(state => state.shop.deliveryZone);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const closeOnboarding = useCallback((): void => {
    dispatch(setViewedOnboarding(true));
    navigation.navigate('ShopNav', {
      screen:
        settings &&
        settings.selection_delivery_zone_first_login_after_registration &&
        !deliveryZone
          ? 'DeliveryMap'
          : 'Main',
    });
  }, [settings, deliveryZone]);

  useFocusEffect(
    React.useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        dispatch(setCartButtonVisible(false));
      });
    }, []),
  );

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={[appStyles.flexBlock, {backgroundColor: '#fff'}]}>
      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        barStyle="dark-content"
      />

      <View style={styles.container}>
        <View style={appStyles.flexBlock}>
          <Text style={styles.instructionsTitle}>
            1. Доставка продуктов в ближайшем от вас месте и в удобное время!
          </Text>
          <Text style={styles.descriptionText}>
            Зарегистрируйтесь в приложении Добродел по номеру телефона. Откройте
            каталог товаров и добавьте товары в корзину, чтобы сделать заказ.
            {'\n\n'}
            На заказ от 500 рублей и выше мы дарим бесплатную доставку.
          </Text>
          <FastImage
            source={require('../../../assets/images/how-works-img-1.png')}
            resizeMode={FastImage.resizeMode.cover}
            style={[styles.instructionsImage, {height: 393}]}
          />
        </View>
        <View style={[appStyles.flexBlock, {top: -25}]}>
          <Text style={[styles.instructionsTitle, {marginBottom: 25}]}>
            2. Мы доставляем в зону шаговой доступности
          </Text>
          <View style={styles.instructionsRow}>
            <View style={appStyles.row}>
              <Watch style={styles.infoIcon} />
              <View>
                <Text style={styles.infoTitle}>Пешая доступность</Text>
                <Text style={styles.infoSubtitle}>Не более 10 минут</Text>
              </View>
            </View>
            <View style={appStyles.row}>
              <Location style={[styles.infoIcon, {marginRight: 5}]} />
              <View>
                <Text style={styles.infoTitle}>Радиус выдачи</Text>
                <Text style={styles.infoSubtitle}>Не более 1 км</Text>
              </View>
            </View>
          </View>
          <FastImage
            source={require('../../../assets/images/how-works-img-2.png')}
            resizeMode={FastImage.resizeMode.cover}
            style={[styles.instructionsImage, {height: 360}]}
          />
        </View>
        <View style={appStyles.flexBlock}>
          <Text style={[styles.instructionsTitle, {marginBottom: 25}]}>
            3. Забираете в удобное время в течение интервала выдачи
          </Text>
          <View style={[appStyles.row, {marginLeft: 10}]}>
            <Watch style={styles.infoIcon} />
            <View>
              <Text style={styles.infoTitle}>Время выдачи</Text>
              <Text style={styles.infoSubtitle}>Утро 6:00-10:00</Text>
              <Text style={styles.infoSubtitle}>Вечер 18:00-22:00</Text>
            </View>
          </View>
          <FastImage
            source={require('../../../assets/images/how-works-img-3.png')}
            resizeMode={FastImage.resizeMode.cover}
            style={[styles.instructionsImage, {height: 285}]}
          />
        </View>
      </View>
      <View style={styles.instructionsButton}>
        <AppButton title="Начать" onPress={closeOnboarding} />
      </View>
    </ScrollView>
  );
};

export default HowItWorksScreen;
