import React, {useState, useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PortalProvider} from '@gorhom/portal';
import SplashScreen from 'react-native-splash-screen';

import {store, persistor} from 'store/configureStore';

import {navigationRef} from 'navigation/RootNavigation';

import AppNavigator from 'navigation/AppNavigator';
import CartNotification from 'components/app/CartNotification/CartNotification';
import ProductModal from 'components/modals/ProductModal/ProductModal';
import ActionModal from 'components/modals/ActionModal/ActionModal';
import DeliveryPointModal from 'components/modals/DeliveryPointModal/DeliveryPointModal';
import AppUpdateModal from 'components/modals/AppUpdateModal/AppUpdateModal';

import DropdownAlertCustom from 'components/app/DropdownAlertCustom/DropdownAlertCustom';

import AnalyticsService from 'services/AnalyticsService';

const App = () => {
  const [isUpdateVisible, setUpdateVisible] = useState<boolean>(true);
  const routeNameRef = useRef<any>();

  const onNavigationReady = (): void => {
    const currentNavigationRef = navigationRef.current;
    if (currentNavigationRef) {
      const currentNavigationRoute = currentNavigationRef.getCurrentRoute();
      if (currentNavigationRoute) {
        routeNameRef.current = currentNavigationRoute.name;
      }
    }
  };

  const onNavigationStateChange = (): void => {
    const previousRouteName = routeNameRef.current;
    const currentNavigationRef = navigationRef.current;
    if (currentNavigationRef) {
      const currentNavigationRoute = currentNavigationRef.getCurrentRoute();
      if (currentNavigationRoute) {
        const currentRouteName = currentNavigationRoute.name;
        if (previousRouteName !== currentRouteName) {
          if (currentRouteName === 'Cart') {
            AnalyticsService.trackEvent(
              `go_to_cart_from_${previousRouteName.toLowerCase()}`,
            ).then();
          }
          AnalyticsService.trackScreen(currentRouteName).then();
        }
        routeNameRef.current = currentRouteName;
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      !isUpdateVisible && setUpdateVisible(true);
    }, 2000);

    AnalyticsService.registerAnalytics().then();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer
          ref={navigationRef}
          onReady={onNavigationReady}
          onStateChange={onNavigationStateChange}>
          <PortalProvider>
            <SafeAreaProvider>
              <AppNavigator />
            </SafeAreaProvider>
            <ProductModal />
            <ActionModal />
            <DeliveryPointModal />
            <CartNotification />
            <AppUpdateModal
              isUpdateVisible={isUpdateVisible}
              setUpdateVisible={setUpdateVisible}
            />
          </PortalProvider>
        </NavigationContainer>
        <DropdownAlertCustom />
      </PersistGate>
    </Provider>
  );
};

export default App;
