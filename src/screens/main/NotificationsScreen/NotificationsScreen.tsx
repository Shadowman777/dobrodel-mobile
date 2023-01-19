import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Switch} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAppSelector} from 'hooks/appHooks';
import {getUser} from 'store/slices/authSlice/authThunks';
import {updateNotifications} from 'store/slices/mainSlice/mainThunks';
import {UpdateNotificationsPayload} from 'store/slices/mainSlice/types';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import constants from 'assets/styles/constants';

const NotificationsScreen = () => {
  const [infoOrders, setInfoOrders] = useState<boolean | undefined>(false);
  const [infoNews, setInfoNews] = useState<boolean | undefined>(false);

  const user = useAppSelector(state => state.auth.user);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUser());
    }, []),
  );
  useEffect(() => {
    if (user) {
      if (user.notifications_news) {
        setInfoNews(user.notifications_news);
      }
      if (user.notifications_order) {
        setInfoOrders(user.notifications_order);
      }
    }
  }, [user]);

  const changeInfo = (e: boolean | undefined, type: 'order' | 'news'): void => {
    type === 'order' ? setInfoOrders(e) : setInfoNews(e);

    if (e !== undefined) {
      const payload: UpdateNotificationsPayload = {
        type,
        status: e,
      };

      dispatch(updateNotifications(payload));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={appStyles.appTitle}>Уведомления</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchRowText}>Информация по заказам</Text>
          <Switch
            value={infoOrders}
            onValueChange={e => changeInfo(e, 'order')}
            thumbColor="#fff"
            trackColor={{false: '#ececec', true: constants.colors.primary}}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchRowText}>Новости и акции</Text>
          <Switch
            value={infoNews}
            onValueChange={e => changeInfo(e, 'news')}
            thumbColor="#fff"
            trackColor={{false: '#ececec', true: constants.colors.primary}}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Page', {type: 'consent_receive_advertising'})
          }
          style={styles.notificationsLink}>
          <Text style={styles.switchRowText}>
            Согласие на получение рекламной рассылки
          </Text>
          <Ionicons
            name="ios-arrow-forward"
            color={constants.colors.primaryText}
            size={27}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationsScreen;
