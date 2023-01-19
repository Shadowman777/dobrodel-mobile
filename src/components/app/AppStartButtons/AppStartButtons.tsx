import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppButton from 'components/app/AppButton/AppButton';

import {useAppSelector} from 'hooks/appHooks';
import {setViewedOnboarding} from 'store/slices/mainSlice/mainSlice';

import {Settings} from 'types/main/mainTypes';

import AnalyticsService from 'services/AnalyticsService';

import onboardingStyles from 'assets/styles/onboardingStyles';
import styles from './styles';
import appStyles from 'assets/styles/appStyles';

type ButtonPosition = 'top' | 'bottom';

interface StackRoute {
  stack: string;
  screen: string;
}

interface IAppStartButtonsProps {
  topButtonText: string;
  topButtonRoute: string | StackRoute;
  bottomButtonText?: string;
  bottomButtonRoute?: string | StackRoute;
  clearSceneInterval?: () => void;
  type?: string;
  settings?: Settings | null;
}

const AppStartButtons: React.FC<IAppStartButtonsProps> = ({
  type = 'greeting',
  ...props
}) => {
  const settings = useAppSelector(state => state.main.settings);
  const deliveryZone = useAppSelector(state => state.shop.deliveryZone);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const trackStartEvents = useCallback(
    (route: StackRoute, buttonPos: ButtonPosition) => {
      if (buttonPos === 'bottom' && route.screen === 'AuthForm') {
        AnalyticsService.trackEvent('enter_to_app');
      } else if (route.screen === 'Main') {
        AnalyticsService.trackEvent(`go_to_catalog_from_${type}`);
      } else {
        AnalyticsService.trackEvent(`go_to_auth_from_${type}`);
      }
    },
    [type],
  );

  const changeRoute = useCallback(
    (buttonPos: ButtonPosition, route?: string | StackRoute) => {
      if (settings && !settings.show_onboarding) {
        dispatch(setViewedOnboarding(true));
      }
      if (route && typeof route === 'string') {
        if (route === 'Onboarding') {
          AnalyticsService.trackEvent('start_slide_how_it_works');
          navigation.navigate('Onboarding', {onboardingType: 'learning'});
        } else {
          navigation.navigate(route);
        }
      } else if (route && typeof route !== 'string') {
        trackStartEvents(route, buttonPos);
        if (route.screen === 'Main') {
          props.clearSceneInterval && props.clearSceneInterval();
          dispatch(setViewedOnboarding(true));
          if (
            props.settings &&
            props.settings
              .selection_delivery_zone_first_login_after_registration &&
            !deliveryZone
          ) {
            navigation.navigate('ShopNav', {screen: 'DeliveryMap'});
          } else {
            navigation.navigate('ShopNav', {screen: 'Main'});
          }
        } else {
          navigation.navigate(route.stack, {screen: route.screen});
        }
      }
    },
    [props.settings, deliveryZone, settings],
  );

  return (
    <View style={styles.slideButtonsWrapper}>
      <View style={[appStyles.appButtonShadow, {width: '100%'}]}>
        <AppButton
          title={props.topButtonText}
          onPress={() => changeRoute('top', props.topButtonRoute)}
          paddingVertical={15}
          buttonShadow
        />
      </View>
      {props.bottomButtonText && props.bottomButtonRoute ? (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => changeRoute('bottom', props.bottomButtonRoute)}
          style={{marginTop: 15}}>
          <Text style={onboardingStyles.slideSecondaryButtonText}>
            {props.bottomButtonText}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default AppStartButtons;
