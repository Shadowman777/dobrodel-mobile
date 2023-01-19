import React, {useCallback} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Platform} from 'react-native';

import AuthStack from 'navigation/stacks/AuthStack';
import FeedbackScreen from 'screens/main/FeedbackScreen/FeedbackScreen';
import GreetingScreen from 'screens/main/GreetingScreen/GreetingScreen';
import OnboardingScreen from 'screens/main/OnboardingScreen/OnboardingScreen';
import DeliveryMapScreen from 'screens/shop/DeliveryMapScreen/DeliveryMapScreen';

import {useAppSelector} from 'hooks/appHooks';

import HeaderOptions from 'components/headers/options/HeaderOptions';
import HeaderRightDemo from 'components/headers/HeaderRightDemo/HeaderRightDemo';

import appStyles from 'assets/styles/appStyles';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const isViewedOnboarding = useAppSelector(
    state => state.main.isViewedOnboarding,
  );
  const firstLaunch = useAppSelector(state => state.main.firstLaunch);
  const settings = useAppSelector(state => state.main.settings);

  const getInitialRouteName = useCallback(() => {
    if (firstLaunch) {
      return 'Greeting';
    }

    return 'AuthNav';
  }, [settings, firstLaunch, isViewedOnboarding]);

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="AuthNav"
        component={AuthStack}
        options={{
          header: () => null,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          ...HeaderOptions,
          headerStyle: {
            ...appStyles.appHeaderShadow,
            height: Platform.OS === 'ios' ? 90 : undefined,
          },
          headerRight: () => <HeaderRightDemo top={-13} left={-5} />,
        }}
      />
      <Stack.Screen
        name="Greeting"
        component={GreetingScreen}
        options={{
          title: '',
          headerTransparent: true,
          headerRight: () => null,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          title: '',
          headerTransparent: true,
          headerRight: () => null,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="DeliveryMap"
        initialParams={{mapType: 'zone', fromCart: false, showDeliveryButton : true}}
        component={DeliveryMapScreen}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
