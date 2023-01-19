import React, {Dispatch, SetStateAction, useState, useCallback} from 'react';
import {View} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';

import AnalyticsService from 'services/AnalyticsService';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import constants from 'assets/styles/constants';

interface IAppInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label?: string;
  isStaticLabel?: boolean;
  hint?: string;
  multiline?: boolean;
  formalization?: boolean;
  props?: any;
}

const AppInput: React.FC<IAppInputProps> = ({
  value,
  setValue,
  label = '',
  isStaticLabel = false,
  hint = '',
  multiline = false,
  formalization = false,
  ...props
}) => {
  const [isFocused, setFocused] = useState<boolean>(false);

  const handleBlur = useCallback(() => {
    switch (label) {
      case 'Ваше имя':
        if (formalization) {
          AnalyticsService.trackEvent('edit_name_in_formalization');
        } else {
          AnalyticsService.trackEvent('edit_name');
        }
        break;
      case 'Ваша фамилия':
        if (formalization) {
          AnalyticsService.trackEvent('edit_surname_in_formalization');
        } else {
          AnalyticsService.trackEvent('edit_surname');
        }
        break;
      case 'Email':
        if (formalization) {
          AnalyticsService.trackEvent('edit_email_in_formalization');
        } else {
          AnalyticsService.trackEvent('edit_email');
        }
        break;
    }

    setFocused(false);
  }, [formalization, label]);

  return (
    <View>
      <FloatingLabelInput
        value={value}
        onChangeText={(e: string) => setValue(e)}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        label={label}
        staticLabel={isStaticLabel}
        hint={hint}
        hintTextColor={constants.colors.primaryText}
        multiline={multiline}
        containerStyles={appStyles.inputContainer}
        inputStyles={{
          ...appStyles.input,
          ...styles.customInput,
          borderBottomColor: isFocused
            ? '#f8cb16'
            : constants.colors.primaryText,
          paddingVertical: multiline ? 12 : 8,
        }}
        labelStyles={styles.label}
        customLabelStyles={{
          colorBlurred: constants.colors.primaryText,
          colorFocused: constants.colors.primaryText,
          fontSizeFocused: 12,
        }}
        {...props}
      />
    </View>
  );
};

export default AppInput;
