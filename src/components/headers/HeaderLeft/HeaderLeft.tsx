import React from 'react';
import {TouchableOpacity, View, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Menu from 'assets/icons/menu.svg';
import HamburgerCar from 'assets/icons/hamburger_car.svg';

import {useAppSelector} from 'hooks/appHooks';

import appStyles from 'assets/styles/appStyles';
import styles from 'components/headers/styles';

const HeaderLeft: React.FC<{type?: string}> = ({type = 'menu'}) => {
  const user = useAppSelector(state => state.auth.user);
  const isDeliveryInfo = useAppSelector(
    state => state.profile.isDeliveryOrders,
  );
  const navigation = useNavigation();

  const changeRoute = (): void => {
    if (type === 'back') {
      navigation.goBack();
    } else if (!user) {
      navigation.navigate('AuthNav', {screen: 'AuthMain'});
    } else {
      navigation.navigate('ProfileNav', {screen: 'Menu'});
    }
  };

  return (
    <TouchableOpacity
      onPress={changeRoute}
      style={[
        type !== 'main' && styles.headerIconContainer,
        appStyles.flexCenter,
        {marginLeft: 15},
      ]}>
      {type !== 'main' ? (
        <Ionicons name="ios-arrow-back-outline" size={25} color="#000" />
      ) : (
        <View style={{position: 'relative'}}>
          <Menu
            width={22}
            height={22}
            style={{marginBottom: Platform.OS === 'ios' ? 12 : 0}}
          />
          {isDeliveryInfo ? <HamburgerCar style={styles.carContainer} /> : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(HeaderLeft);
