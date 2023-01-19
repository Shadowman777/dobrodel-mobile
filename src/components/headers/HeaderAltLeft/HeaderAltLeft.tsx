import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAppSelector} from 'hooks/appHooks';
import {setPaymentUrl} from 'store/slices/profileSlice/profileSlice';

import AnalyticsService from 'services/AnalyticsService';

import appStyles from 'assets/styles/appStyles';
import styles from 'components/headers/styles';

const HeaderAltLeft: React.FC<{
  headerType?: string;
  isTinkoff?: boolean;
  route?: string;
  top?: number;
  type?: string;
}> = ({headerType = '', isTinkoff = false, route, top, type}) => {
  const lastOrderId = useAppSelector(state => state.profile.lastOrderId);
  const isViewedOnboarding = useAppSelector(
    state => state.main.isViewedOnboarding,
  );
  const settings = useAppSelector(state => state.main.settings);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleBack = useCallback((): void => {
    if (type) {
      AnalyticsService.trackEvent(`back_from_${type}`);
    }

    if (settings && settings.show_onboarding && !isViewedOnboarding) {
      navigation.navigate('Onboarding', {onboardingType: 'learning'});
    } else if (isTinkoff) {
      dispatch(setPaymentUrl(''));
      navigation.navigate('ProfileNav', {
        screen: 'Order',
        params: {id_order: +lastOrderId},
      });
    } else if (type === 'orders') {
      navigation.navigate('Menu');
    } else if (type === 'menu') {
      navigation.navigate('ShopNav', {screen: 'Main'});
    } else if (route) {
      navigation.navigate('ShopNav', {screen: route});
    } else {
      navigation.goBack();
    }
  }, [settings, isViewedOnboarding, isTinkoff, lastOrderId, type, route]);

  return (
    <TouchableOpacity
      onPress={handleBack}
      style={{
        ...(headerType !== 'close' && styles.headerIconContainer),
        ...appStyles.flexCenter,
        marginLeft: 10,
        top,
      }}>
      <Ionicons
        name={headerType === 'close' ? 'ios-close-outline' : 'ios-arrow-back'}
        size={30}
        color="#212429"
      />
    </TouchableOpacity>
  );
};

export default HeaderAltLeft;
