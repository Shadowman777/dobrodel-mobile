import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity, Keyboard, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Formik, Field} from 'formik';
import {useDebouncedCallback} from 'use-debounce';

import FormInput from 'components/form/FormInput/FormInput';
import ErrorMessage from 'components/form/ErrorMessage/ErrorMessage';

import {useAppSelector} from 'hooks/appHooks';
import {getSmsForAuth} from 'store/slices/authSlice/authThunks';

import validationSchema from './validationSchema';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const {width} = Dimensions.get('window');

interface IAuthFormCodeProps {
  onSuccess: Function;
  phone: string;
  isIntervalStarted: boolean;
  setIntervalStarted: Dispatch<SetStateAction<boolean>>;
  isIntervalEnded: boolean;
  setIntervalEnded: Dispatch<SetStateAction<boolean>>;
  intervalTime: number;
  setIntervalTime: Dispatch<SetStateAction<number>>;
  intervalRef: React.MutableRefObject<any>;
}

const AuthFormCode: React.FC<IAuthFormCodeProps> = props => {
  const {
    onSuccess,
    phone,
    isIntervalStarted,
    setIntervalStarted,
    isIntervalEnded,
    setIntervalEnded,
    intervalTime,
    setIntervalTime,
    intervalRef,
  } = props;

  const [smsCode, setSmsCode] = useState<string>('');
  const debouncedSmsCode = useDebouncedCallback(
    value => setSmsCode(value),
    1500,
  );
  const [isInputBlocked, setInputBlocked] = useState<boolean>(false);

  const formikHelpers = useRef<any>(null);

  const settings = useAppSelector(state => state.main.settings);

  const dispatch = useDispatch();

  const getSmsAgain = (): void => {
    const formattedPhone = phone.replace(/[\(\)\- ]/g, '');
    dispatch(
      getSmsForAuth({
        phone: formattedPhone,
        setIntervalStarted: setIntervalStarted,
      }),
    );
    setIntervalEnded(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setInputBlocked(false);
    }, []),
  );

  useEffect(() => {
    if (
      smsCode &&
      settings?.length_code_sms &&
      smsCode.length === settings.length_code_sms &&
      formikHelpers.current &&
      !isInputBlocked
    ) {
      const newValues = {
        phone: phone.replace(/[\(\)\- ]/g, ''),
        sms_code: +smsCode,
      };
      onSuccess(
        newValues,
        formikHelpers.current.setFieldError,
        debouncedSmsCode,
        formikHelpers,
        setInputBlocked,
      );
    }
  }, [smsCode, formikHelpers.current, phone, settings, isInputBlocked]);

  useEffect(() => {
    if (isIntervalStarted) {
      intervalRef.current = setInterval(() => {
        setIntervalTime(prevState => prevState - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isIntervalStarted]);

  useEffect(() => {
    if (intervalTime === 0 && isIntervalStarted && intervalRef?.current) {
      Keyboard.dismiss();
      clearInterval(intervalRef.current);

      setIntervalEnded(true);
      setIntervalStarted(false);

      if (settings && settings.resending_sms) {
        setIntervalTime(settings.resending_sms);
      }

      setInputBlocked(true);
      formikHelpers.current.resetForm();
      debouncedSmsCode.flush();
    }
  }, [intervalTime, intervalRef]);

  useEffect(() => {
    if (smsCode.length === 0 && isInputBlocked) {
      setInputBlocked(false);
    }
  }, [smsCode, isInputBlocked]);

  return (
    <View style={{width: width * 0.9}}>
      <Text style={appStyles.appTitle}>Введите полученный код</Text>
      <Text style={{...appStyles.appSubtitle, textAlign: 'left'}}>
        Авторизуйтесь, и можно будет совершать покупки
      </Text>
      <Formik
        innerRef={formikHelpers}
        initialValues={{
          phone: phone,
          sms_code: '',
        }}
        onSubmit={(values, actions) => {
          const newValues = {
            phone: values.phone.replace(/[\(\)\- ]/g, ''),
            sms_code: +values.sms_code,
          };
          onSuccess(newValues, actions);
        }}
        validationSchema={validationSchema}>
        {({status}) => (
          <View>
            <Field
              component={FormInput}
              name="phone"
              mask={
                settings && settings.phone_number_format
                  ? settings.phone_number_format.replace(/9/g, 'X')
                  : undefined
              }
              maskType="phone"
              keyboardType="numeric"
              phone
            />
            <Field
              component={FormInput}
              name="sms_code"
              keyboardType="numeric"
              staticLabel={true}
              hint="Введите код"
              setSmsCode={debouncedSmsCode}
              autofocus
            />
            {isIntervalStarted ? (
              <View style={styles.smsWrapper}>
                <Text style={styles.smsIntervalText}>
                  Код будет выслан повторно через {intervalTime} секунд
                </Text>
              </View>
            ) : null}
            {isIntervalEnded ? (
              <TouchableOpacity onPress={getSmsAgain} style={styles.smsButton}>
                <Text style={styles.smsButtonText}>Выслать повторно</Text>
              </TouchableOpacity>
            ) : null}

            <ErrorMessage>{status}</ErrorMessage>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AuthFormCode;
