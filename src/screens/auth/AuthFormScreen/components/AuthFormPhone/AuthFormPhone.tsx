import React, {useCallback} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Formik, Field} from 'formik';

import FormInput from 'components/form/FormInput/FormInput';
import ErrorMessage from 'components/form/ErrorMessage/ErrorMessage';
import ContinueButton from 'components/app/ContinueButton/ContinueButton';

import {useAppSelector} from 'hooks/appHooks';
import validationSchema from './validationSchema';

import appStyles from 'assets/styles/appStyles';
import AnalyticsService from 'services/AnalyticsService';

const {width} = Dimensions.get('window');

const AuthFormPhone: React.FC<{onSuccess: Function}> = ({onSuccess}) => {
  const settings = useAppSelector(state => state.main.settings);

  const phoneFormSubmit = useCallback((handleSubmit: () => void) => {
    AnalyticsService.trackEvent('phone_submit');
    handleSubmit();
  }, []);

  return (
    <View style={{width: width * 0.9}}>
      <Text style={appStyles.appTitle}>Ваш телефон</Text>
      <Text style={[appStyles.appSubtitle, appStyles.textLeft]}>
        Мы отправим код, и можно будет совершать покупки
      </Text>
      <Formik
        initialValues={{
          phone: '',
        }}
        onSubmit={(values, actions) => {
          onSuccess(values.phone);
          actions.resetForm();
        }}
        validationSchema={validationSchema}>
        {({handleSubmit, isValid, status}) => (
          <View>
            <View style={[appStyles.flexBlock, appStyles.row]}>
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

              <ContinueButton
                onPress={() => phoneFormSubmit(handleSubmit)}
                disabled={!isValid}
              />
            </View>

            <ErrorMessage>{status}</ErrorMessage>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AuthFormPhone;
