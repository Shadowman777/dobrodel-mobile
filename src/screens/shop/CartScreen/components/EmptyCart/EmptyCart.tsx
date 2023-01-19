import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppButton from 'components/app/AppButton/AppButton';

import appStyles from 'assets/styles/appStyles';

const {width} = Dimensions.get('window');

const EmptyCart = () => {
  const navigation = useNavigation();

  return (
    <View style={[appStyles.grow, appStyles.flexCenter]}>
      <View style={{width: width * 0.85}}>
        <Text style={[appStyles.appTitle, appStyles.textCenter]}>
          В вашей корзине{'\n'}нет товаров
        </Text>
        <Text style={[appStyles.appSubtitle, appStyles.textCenter]}>
          Чтобы совершить покупки,{'\n'}выберите товары в каталоге
        </Text>
        <View style={{marginTop: 8}}>
          <AppButton
            title="Перейти на главную"
            onPress={() => navigation.navigate('Main')}
          />
        </View>
      </View>
    </View>
  );
};

export default EmptyCart;
