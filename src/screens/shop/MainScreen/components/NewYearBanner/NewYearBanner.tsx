import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {setVisibleNewYearBanner} from 'store/slices/mainSlice/mainSlice';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const NewYearBanner = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.newYearBanner}>
      <View style={appStyles.alignEnd}>
        <TouchableOpacity
          onPress={() => dispatch(setVisibleNewYearBanner(false))}
          style={styles.newYearBannerCloseButton}>
          <Ionicons name="ios-close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.newYearBannerContent}>
        <Text style={styles.newYearBannerTitle}>Работаем все праздники!</Text>
        <Text style={styles.newYearBannerSubtitle}>
          Все заказы в праздничные дни мы доставляем в обычном режиме ❄️☃️
        </Text>
      </View>
    </View>
  );
};

export default NewYearBanner;
