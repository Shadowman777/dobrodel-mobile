import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, BackHandler, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import FeatherIcons from 'react-native-vector-icons/Feather';

import AppListItem from 'components/app/AppListItem/AppListItem';
import AgreementModal from 'components/modals/AgreementModal/AgreementModal';

import {useAppSelector} from 'hooks/appHooks';
import {logout} from 'store/slices/authSlice/authSlice';
import {getUser} from 'store/slices/authSlice/authThunks';
import {clearOrders} from 'store/slices/profileSlice/profileSlice';
import {getOrders} from 'store/slices/profileSlice/profileThunks';
import {setCartButtonVisible} from 'store/slices/shopSlice/shopSlice';

import DropdownAlertService from 'services/DropdownAlertService';
import AnalyticsService from 'services/AnalyticsService';

import LocalMail from 'assets/icons/local_mail.svg';
import Location from 'assets/icons/location.svg';
import Share from 'assets/icons/share.svg';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import constants, {APP_VERSION} from 'assets/styles/constants';

const MenuScreen = () => {
  const [isAgreementVisible, setAgreementVisible] = useState<boolean>(false);

  const orders = useAppSelector(state => state.profile.orders);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userLogout = (): void => {
    dispatch(logout());
    dispatch(clearOrders());

    navigation.navigate('Main');
  };

  const changeRoute = (route: string): void => {
    navigation.navigate(route);
  };

  const goBack = (): boolean => {
    navigation.navigate('ShopNav', {screen: 'Main'});
    return true;
  };

  const copyText = (): void => {
    Clipboard.setString(APP_VERSION);
    DropdownAlertService.alert('success', 'Номер версии скопирован');
  };

  const openSharePage = (): void => {
    setAgreementVisible(true);
    AnalyticsService.trackEvent('interest_in_invite_friend').then();
  };

  const userIcon = (
    <FeatherIcons name="user" size={25} color={constants.colors.primaryText} />
  );
  const ordersIcon = <LocalMail />;
  const locationIcon = <Location />;
  const shareIcon = <Share />;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUser());
      dispatch(getOrders());
      dispatch(setCartButtonVisible(false));

      BackHandler.addEventListener('hardwareBackPress', goBack);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', goBack);
      };
    }, []),
  );

  return (
    <View style={[appStyles.grow, appStyles.alignCenter]}>
      <View style={styles.menuWrapper}>
        <View style={{marginTop: 8}}>
          <AppListItem
            title="Личный кабинет"
            leftIcon={userIcon}
            onPress={() => changeRoute('ProfileEdit')}
            bold
          />
          <AppListItem
            title="Заказы"
            subtitle={
              orders && orders.length > 0 ? orders.length.toString() : undefined
            }
            leftIcon={ordersIcon}
            onPress={() => changeRoute('Orders')}
            bold
          />
          <AppListItem
            title="Пригласи друга"
            leftIcon={shareIcon}
            // onPress={() => navigation.navigate('Share')}
            onPress={openSharePage}
            bold
          />
          <AppListItem
            title="Пункты выдачи"
            leftIcon={locationIcon}
            onPress={() =>
              navigation.navigate('DeliveryMap', {
                fromCart: false,
                mapType: 'points',
                showDeliveryButton: false,
              })
            }
            bold
          />
        </View>
        <View style={{paddingBottom: 55}}>
          <AppListItem
            title="Служба поддержки"
            onPress={() => changeRoute('Feedback')}
            bottomDivider
          />
          <AppListItem
            title="Как это работает"
            onPress={() => changeRoute('Onboarding')}
            bottomDivider
          />
          <AppListItem
            title="Уведомления"
            onPress={() => changeRoute('Notifications')}
            bottomDivider
          />
          <AppListItem
            title="О нас"
            onPress={() => changeRoute('About')}
            bottomDivider
          />
          <AppListItem
            title="Выйти"
            bottomDivider={false}
            onPress={userLogout}
          />
          <View style={styles.versionWrapper}>
            <TouchableOpacity activeOpacity={1} onPress={copyText}>
              <Text
                style={{
                  ...styles.versionText,
                  textDecorationLine: 'underline',
                }}>
                v{APP_VERSION}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <AgreementModal
        isVisible={isAgreementVisible}
        setVisible={setAgreementVisible}
        title={
          'Ваш голос учтен, спасибо за проявленный интерес! Функциональность в разработке.'
        }
      />
    </View>
  );
};

export default MenuScreen;
