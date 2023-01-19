import React from 'react';
import {View, Text, Dimensions, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppListItem from 'components/app/AppListItem/AppListItem';

import {IPage} from 'types/main/mainTypes';

import appStyles from 'assets/styles/appStyles';

const {width} = Dimensions.get('window');

const AboutScreen = () => {
  const navigation = useNavigation();

  const changeRoute = (type: IPage): void => {
    navigation.navigate('Page', {type: type});
  };

  return (
    <View style={[appStyles.grow, appStyles.alignCenter, {paddingTop: 20}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={{width: width * 0.92}}>
        <Text style={appStyles.appTitle}>О нас</Text>
        <AppListItem
          onPress={() => changeRoute('terms_use')}
          title="Пользовательское соглашение"
          chevron
          bottomDivider
        />
        <AppListItem
          onPress={() => changeRoute('privacy_policy')}
          title="Политика конфеденциальности"
          chevron
          bottomDivider
        />
        <AppListItem
          onPress={() => changeRoute('personal_data')}
          title="Согласие на обработку персональных данных"
          chevron
          bottomDivider
        />
        <AppListItem
          onPress={() => changeRoute('consent_receive_advertising')}
          title="Согласие на получение рекламной рассылки"
          chevron
          bottomDivider
        />
        <AppListItem
          onPress={() => changeRoute('faq')}
          title="Частые вопросы"
          chevron
          bottomDivider
        />
      </View>
    </View>
  );
};

export default AboutScreen;
