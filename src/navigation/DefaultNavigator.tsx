import React, {useCallback} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Platform} from 'react-native';

import AuthStack from 'navigation/stacks/AuthStack';
import ProfileStack from 'navigation/stacks/ProfileStack';
import ShopStack from 'navigation/stacks/ShopStack';
import PageScreen from 'screens/main/PageScreen/PageScreen';
import AboutScreen from 'screens/main/AboutScreen/AboutScreen';
import FeedbackScreen from 'screens/main/FeedbackScreen/FeedbackScreen';
import GreetingScreen from 'screens/main/GreetingScreen/GreetingScreen';
import OnboardingScreen from 'screens/main/OnboardingScreen/OnboardingScreen';
import HowItWorksScreen from 'screens/main/HowItWorksScreen/HowItWorksScreen';
import NotificationsScreen from 'screens/main/NotificationsScreen/NotificationsScreen';

import {useAppSelector} from 'hooks/appHooks';

import HeaderOptions from 'components/headers/options/HeaderOptions';
import HeaderAltLeft from 'components/headers/HeaderAltLeft/HeaderAltLeft';
import HeaderText from 'components/headers/HeaderText/HeaderText';
import HeaderRightDemo from 'components/headers/HeaderRightDemo/HeaderRightDemo';

import appStyles from 'assets/styles/appStyles';

const Stack = createStackNavigator();

const DefaultNavigator = () => {
  const isViewedOnboarding = useAppSelector(
    state => state.main.isViewedOnboarding,
  );
  const firstLaunch = useAppSelector(state => state.main.firstLaunch);
  const settings = useAppSelector(state => state.main.settings);

  const getInitialRouteName = useCallback(() => {
    if (firstLaunch) {
      return 'Greeting';
    } else if (settings && settings.show_onboarding && !isViewedOnboarding) {
      return 'Onboarding';
    }

    return 'ShopNav';
  }, [settings, firstLaunch, isViewedOnboarding]);

  return (
    <Stack.Navigator
      initialRouteName={getInitialRouteName()}
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="ShopNav"
        component={ShopStack}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AuthNav"
        component={AuthStack}
        options={{
          header: () => null,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="ProfileNav"
        component={ProfileStack}
        options={{
          header: () => null,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        initialParams={{type: ''}}
        name="Page"
        component={PageScreen}
        options={{
          ...HeaderOptions,
          headerRight: () => <HeaderRightDemo top={-13} left={-5} />,
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          ...HeaderOptions,
          headerRight: () => <HeaderRightDemo top={-13} left={-5} />,
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
        name="Notifications"
        component={NotificationsScreen}
        options={{
          ...HeaderOptions,
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
        name="HowItWorks"
        component={HowItWorksScreen}
        options={{
          ...HeaderOptions,
          cardStyleInterpolator: isViewedOnboarding
            ? CardStyleInterpolators.forHorizontalIOS
            : undefined,
          headerLeft: () => <HeaderAltLeft headerType="back" />,
          headerRight: () => <HeaderRightDemo top={-13} left={-5} />,
          headerTitle: () => <HeaderText title="Как это работает" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default DefaultNavigator;
