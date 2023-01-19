import React from 'react';
import {View, Text, Platform} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import MenuScreen from 'screens/profile/MenuScreen/MenuScreen';
import ProfileEditScreen from 'screens/profile/ProfileEditScreen/ProfileEditScreen';
import OrdersScreen from 'screens/profile/OrdersScreen/OrdersScreen';
import ShareScreen from 'screens/profile/ShareScreen/ShareScreen';
import OrderScreen from 'screens/profile/OrderScreen/OrderScreen';
import FormalizationScreen from 'screens/profile/FormalizationScreen/FormalizationScreen';

import HeaderAltLeft from 'components/headers/HeaderAltLeft/HeaderAltLeft';
import HeaderAltRight from 'components/headers/HeaderAltRight/HeaderAltRight';
import HeaderText from 'components/headers/HeaderText/HeaderText';
import HeaderRightDemo from 'components/headers/HeaderRightDemo/HeaderRightDemo';

import HeaderOptions from 'components/headers/options/HeaderOptions';

import OrderRouteScreen from 'screens/profile/OrderRouteScreen/OrderRouteScreen';

import {useAppSelector} from 'hooks/appHooks';

import constants from 'assets/styles/constants';
import appStyles from 'assets/styles/appStyles';

const Stack = createStackNavigator();

const ProfileStack = () => {
  const orders = useAppSelector(state => state.profile.orders);

  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          ...HeaderOptions,
          headerLeft: () => (
            <HeaderAltLeft type="menu" headerType="close" top={-7} />
          ),
          headerRight: () => <HeaderRightDemo top={-13} left={-5} />,
        }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={{
          ...HeaderOptions,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            ...appStyles.appHeaderShadow,
            height: Platform.OS === 'ios' ? 90 : undefined,
          },
          headerTitle: () => <HeaderText title="Личный кабинет" />,
          headerLeft: () => <HeaderAltLeft headerType="back" />,
          headerRight: () => <HeaderRightDemo top={-13} left={-5} />,
        }}
      />
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          ...HeaderOptions,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            ...appStyles.appHeaderShadow,
            height: Platform.OS === 'ios' ? 90 : undefined,
          },
          headerLeft: () => <HeaderAltLeft type="orders" headerType="back" />,
          headerRight: () => <HeaderRightDemo top={-13} left={-5} />,
          headerTitle: () => (
            <View
              style={[
                appStyles.flexBlock,
                Platform.OS === 'ios'
                  ? appStyles.alignEndRow
                  : appStyles.alignCenterRow,
                {marginBottom: Platform.OS === 'ios' ? 8 : 0},
              ]}>
              <Text
                style={{
                  ...appStyles.appHeaderTitle,
                  color: constants.colors.primaryText,
                }}>
                Заказы
              </Text>
              {orders && orders.length > 0 ? (
                <Text
                  style={{
                    ...appStyles.appHeaderTitle,
                    color: constants.colors.primary,
                    paddingLeft: 7,
                  }}>
                  {orders.length.toString()}
                </Text>
              ) : null}
            </View>
          ),
        }}
      />
      <Stack.Screen
        initialParams={{id_order: null}}
        name="Order"
        component={OrderScreen}
        options={{
          ...HeaderOptions,
          title: '',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerLeft: () => null,
          headerTitle: () => null,
          headerRight: () => <HeaderAltRight type="order" order />,
        }}
      />
      <Stack.Screen
        name="Share"
        component={ShareScreen}
        options={{
          ...HeaderOptions,
          title: '',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerLeft: () => null,
          headerTitle: () => <HeaderText title="Пригласи друга" />,
          headerRight: () => <HeaderAltRight type="share" />,
        }}
      />
      <Stack.Screen
        initialParams={{
          order_delivery_point: null,
          order_id: null,
        }}
        name="OrderRoute"
        component={OrderRouteScreen}
        options={({route}: any) => ({
          ...HeaderOptions,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerLeft: () => <HeaderAltLeft headerType="back" />,
          headerTitle: () => (
            <HeaderText title={`Заказ №${route.params.order_id}`} />
          ),
          headerRight: () => <HeaderRightDemo top={-13} left={-5} />,
        })}
      />
      <Stack.Screen
        name="Formalization"
        component={FormalizationScreen}
        options={{
          ...HeaderOptions,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            ...appStyles.appHeaderShadow,
            height: Platform.OS === 'ios' ? 90 : undefined,
          },
          headerLeft: () => <HeaderAltLeft headerType="back" />,
          headerRight: () => <HeaderRightDemo top={-13} left={-5} />,
          headerTitle: () => <HeaderText title="Оформление" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
