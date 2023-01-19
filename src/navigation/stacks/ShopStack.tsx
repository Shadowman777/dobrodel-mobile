import React, {useCallback} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import MainScreen from 'screens/shop/MainScreen/MainScreen';
import CatalogScreen from 'screens/shop/CatalogScreen/CatalogScreen';
import CategoryScreen from 'screens/shop/CategoryScreen/CategoryScreen';
import SecondaryCategoryScreen from 'screens/shop/SecondaryCategoryScreen/SecondaryCategoryScreen';
import ActionProductsScreen from 'screens/shop/ActionProductsScreen/ActionProductsScreen';
import SearchScreen from 'screens/shop/SearchScreen/SearchScreen';
import CartScreen from 'screens/shop/CartScreen/CartScreen';
import DeliveryMapScreen from 'screens/shop/DeliveryMapScreen/DeliveryMapScreen';
import DeliveryScreen from 'screens/shop/DeliveryScreen/DeliveryScreen';

import HeaderLeft from 'components/headers/HeaderLeft/HeaderLeft';
import HeaderRight from 'components/headers/HeaderRight/HeaderRight';
import HeaderAltLeft from 'components/headers/HeaderAltLeft/HeaderAltLeft';
import HeaderAltRight from 'components/headers/HeaderAltRight/HeaderAltRight';
import HeaderSearch from 'components/headers/HeaderSearch/HeaderSearch';
import HeaderText from 'components/headers/HeaderText/HeaderText';
import HeaderRightDemo from 'components/headers/HeaderRightDemo/HeaderRightDemo';

import {useAppSelector} from 'hooks/appHooks';

import HeaderOptions from 'components/headers/options/HeaderOptions';

const Stack = createStackNavigator();

const ShopStack = () => {
  const deliveryZone = useAppSelector(state => state.shop.deliveryZone);
  const settings = useAppSelector(state => state.main.settings);

  const getInitialRoute = useCallback((): string => {
    if (
      settings &&
      settings.selection_delivery_zone_first_login_after_registration &&
      !deliveryZone
    ) {
      return 'DeliveryMap';
    }

    return 'Main';
  }, [settings, deliveryZone]);

  return (
    <Stack.Navigator
      initialRouteName={getInitialRoute()}
      screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          ...HeaderOptions,
          headerLeft: () => <HeaderLeft type="main" />,
          headerRight: () => <HeaderRight feedbackShown />,
        }}
      />
      <Stack.Screen
        initialParams={{
          sectionTitle: 'Каталог товаров',
          categories: [],
          popularCategories: [],
        }}
        name="Catalog"
        component={CatalogScreen}
        options={{
          ...HeaderOptions,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerLeft: () => <HeaderLeft type="back" />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        initialParams={{categoryId: null, categoryName: ''}}
        name="Category"
        component={CategoryScreen}
        options={HeaderOptions}
      />
      <Stack.Screen
        initialParams={{id_news: null}}
        name="ActionProducts"
        component={ActionProductsScreen}
        options={HeaderOptions}
      />
      <Stack.Screen
        initialParams={{categoryName: '', products: []}}
        name="SecondaryCategory"
        component={SecondaryCategoryScreen}
        options={HeaderOptions}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          ...HeaderOptions,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerTitleAlign: 'left',
          headerLeft: () => <HeaderLeft type="back" />,
          headerTitle: () => <HeaderSearch />,
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          ...HeaderOptions,
          title: '',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerLeft: () => (
            <HeaderAltLeft headerType="trash" route="Main" type="Cart" />
          ),
          headerRight: () => <HeaderAltRight type="cart" />,
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
      <Stack.Screen
        name="Delivery"
        initialParams={{deliveryPoint: null}}
        component={DeliveryScreen}
        options={{
          ...HeaderOptions,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerLeft: () => <HeaderAltLeft headerType="back" />,
          headerRight: () => <HeaderRightDemo top={-13} left={-5} />,
          headerTitle: () => <HeaderText title="Доставка" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ShopStack;
