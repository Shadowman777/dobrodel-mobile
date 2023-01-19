import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import {getDeviceName} from 'react-native-device-info';
import {DebouncedState} from 'use-debounce/lib/useDebouncedCallback';

import AuthFormPhone from 'screens/auth/AuthFormScreen/components/AuthFormPhone/AuthFormPhone';
import AuthFormCode from 'screens/auth/AuthFormScreen/components/AuthFormCode/AuthFormCode';
import TelegramModal from 'components/modals/TelegramModal/TelegramModal';

import {useAppSelector} from 'hooks/appHooks';
import {
  getSmsForAuth,
  sendAuthSmsCode,
} from 'store/slices/authSlice/authThunks';
import {setLogged, setTelegramLink} from 'store/slices/authSlice/authSlice';

import LinkingService from 'services/LinkingService';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const AuthFormScreen = () => {
  const [phone, setPhone] = useState<string>('');
  const [isIntervalStarted, setIntervalStarted] = useState<boolean>(false);
  const [intervalTime, setIntervalTime] = useState<number>(0);
  const [isIntervalEnded, setIntervalEnded] = useState<boolean>(false);
  const [isTelegramModalVisible, setTelegramModalVisible] =
    useState<boolean>(false);

  const telegramLink = useAppSelector(state => state.auth.telegramLink);
  const referrer = useAppSelector(state => state.auth.referrer);
  const settings = useAppSelector(state => state.main.settings);

  const route = useRoute();
  const {cart}: any = route.params;

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getSms = (newPhone: string): void => {
    const formattedPhone = newPhone.replace(/[\(\)\- ]/g, '');
    const payload = {
      phone: formattedPhone,
      referrer: referrer?.length > 0 ? `?${referrer}` : '',
      setPhone,
      setIntervalStarted,
    };
    dispatch(getSmsForAuth(payload));

    setPhone(newPhone);
  };

  const authorize = useCallback(
    async (
      values: {
        phone: string;
        sms_code: string;
      },
      setFieldError: (field: string, message?: string) => void,
      setSmsCode: DebouncedState<(value: any) => void>,
      formikHelpers: React.MutableRefObject<any>,
      setInputBlocked: Dispatch<SetStateAction<boolean>>,
    ): Promise<void> => {
      const deviceName = await getDeviceName();

      const payload = {
        ...values,
        device_name: deviceName,
        cart,
        setFieldError,
        setIntervalStarted,
        setSmsCode,
        formikHelpers,
        setInputBlocked: setInputBlocked,
        setIntervalTime: setIntervalTime,
        setTelegramModalVisible: setTelegramModalVisible,
      };
      dispatch(sendAuthSmsCode(payload));
    },
    [],
  );

  const goToTelegram = useCallback(async (): Promise<void> => {
    if (telegramLink) {
      await LinkingService.goToUrl(telegramLink);
      dispatch(setTelegramLink(null));
    }

    if (settings?.authorization_required) {
      dispatch(setLogged(true));
    } else {
      navigation.navigate('ShopNav', {screen: 'Main'});
    }
  }, [settings, telegramLink]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setPhone('');
        setIntervalStarted(false);
        setIntervalEnded(false);
        setIntervalTime(0);
        setTelegramModalVisible(false);
      };
    }, []),
  );

  useEffect(() => {
    if (settings && settings.resending_sms) {
      setIntervalTime(settings.resending_sms);
    }
  }, [settings]);

  useEffect(() => {
    if (telegramLink) {
      goToTelegram().then();
    }
  }, [telegramLink]);

  return (
    <ScrollView
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={appStyles.grow}>
      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <View style={styles.authTop}>
        {phone === '' ? (
          <AuthFormPhone onSuccess={getSms} />
        ) : (
          <AuthFormCode
            onSuccess={authorize}
            phone={phone}
            isIntervalStarted={isIntervalStarted}
            setIntervalStarted={setIntervalStarted}
            isIntervalEnded={isIntervalEnded}
            setIntervalEnded={setIntervalEnded}
            intervalTime={intervalTime}
            setIntervalTime={setIntervalTime}
            intervalRef={intervalRef}
          />
        )}
      </View>
      <View style={styles.authBottom}>
        <Text style={styles.authBottomText}>
          Осуществляя вход, вы принимаете условия
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Page', {type: 'personal_data'})}>
          <Text style={[styles.authBottomLink, styles.authBottomText]}>
            пользовательского соглашения
          </Text>
        </TouchableOpacity>
      </View>
      <TelegramModal
        type="link"
        isModalVisible={isTelegramModalVisible}
        setModalVisible={setTelegramModalVisible}
      />
    </ScrollView>
  );
};

export default AuthFormScreen;
