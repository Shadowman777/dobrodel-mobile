import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import AuthMainScreen from 'screens/auth/AuthMainScreen/AuthMainScreen';
import AuthFormScreen from 'screens/auth/AuthFormScreen/AuthFormScreen';

import HeaderAltLeft from 'components/headers/HeaderAltLeft/HeaderAltLeft';
import HeaderAltRight from 'components/headers/HeaderAltRight/HeaderAltRight';
import HeaderRightDemo from 'components/headers/HeaderRightDemo/HeaderRightDemo';
import HeaderOptions from 'components/headers/options/HeaderOptions';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="AuthMain">
    <Stack.Screen
      name="AuthMain"
      component={AuthMainScreen}
      options={{
        ...HeaderOptions,
        headerLeft: () => null,
        headerTitle: () => null,
        headerRight: () => <HeaderAltRight auth />,
      }}
    />
    <Stack.Screen
      initialParams={{cart: false}}
      name="AuthForm"
      component={AuthFormScreen}
      options={{
        ...HeaderOptions,
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        headerLeft: () => <HeaderAltLeft type="registration" />,
        headerRight: () => <HeaderRightDemo top={-13} left={-5} />,
      }}
    />
  </Stack.Navigator>
);

export default AuthStack;
