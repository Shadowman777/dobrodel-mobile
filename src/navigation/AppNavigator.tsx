import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import AuthNavigator from 'navigation/AuthNavigator';
import MainNavigator from 'navigation/MainNavigator';
import DefaultNavigator from 'navigation/DefaultNavigator';

import {useAppSelector} from 'hooks/appHooks';
import {setDeliveryPoint} from 'store/slices/shopSlice/shopSlice';
import {getSettings} from 'store/slices/mainSlice/mainThunks';

import FirebaseService from 'services/FirebaseService';
import ReferralService from 'services/ReferralService';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const initToken = useAppSelector(state => state.auth.initToken);
  const isLogged = useAppSelector(state => state.auth.isLogged);
  const settings = useAppSelector(state => state.main.settings);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!initToken) {
      FirebaseService.requestPermissions(dispatch).then();
    }
    ReferralService.getReferrer(dispatch);

    dispatch(getSettings());
  }, [initToken]);

  useEffect(() => {
    dispatch(setDeliveryPoint(null));
  }, []);

  return (
    <>
      {settings?.authorization_required ? (
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
          {!isLogged ? (
            <Stack.Screen
              name="AuthPages"
              component={AuthNavigator}
              options={{
                header: () => null,
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
            />
          ) : (
            <Stack.Screen
              name="MainPages"
              component={MainNavigator}
              options={{
                header: () => null,
              }}
            />
          )}
        </Stack.Navigator>
      ) : (
        <DefaultNavigator />
      )}
    </>
  );
};

export default AppNavigator;
