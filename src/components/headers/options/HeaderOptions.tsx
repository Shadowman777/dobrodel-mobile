import React from 'react';
import {Platform} from 'react-native';
import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

import HeaderBackground from 'components/headers/HeaderBackground/HeaderBackground';
import HeaderLeft from 'components/headers/HeaderLeft/HeaderLeft';
import HeaderRight from 'components/headers/HeaderRight/HeaderRight';

import appStyles from 'assets/styles/appStyles';

const HeaderOptions: StackNavigationOptions = {
  title: '',
  headerStyle: {
    height: Platform.OS === 'ios' ? 85 : undefined,
  },
  headerLeftContainerStyle:
    Platform.OS === 'ios' ? appStyles.justifyEnd : undefined,
  headerTitleStyle: Platform.OS === 'ios' ? appStyles.justifyEnd : undefined,
  headerRightContainerStyle:
    Platform.OS === 'ios' ? appStyles.justifyEnd : undefined,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerTitle: () => <HeaderBackground />,
  headerLeft: () => <HeaderLeft type="back" />,
  headerRight: () => <HeaderRight />,
};

export default HeaderOptions;
