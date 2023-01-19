import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {DebouncedState} from 'use-debounce/lib/useDebouncedCallback';
import AntIcons from 'react-native-vector-icons/AntDesign';

import ErrorMessage from 'components/form/ErrorMessage/ErrorMessage';

import AnalyticsService from 'services/AnalyticsService';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

interface IFormInputProps {
  field: {
    name: string;
    value: string;
    onChange: Function;
    onBlur: Function;
  };
  form: {errors: {[s: string]: string}; touched: {[s: string]: string}};
  label?: string;
  phone?: boolean;
  setSmsCode?: DebouncedState<(value: any) => void>;
  props?: any;
}

const FormInput: React.FC<IFormInputProps> = ({
  field: {name, value, onChange},
  form: {errors},
  phone = false,
  label = '',
  setSmsCode,
  ...props
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const errorMsg = errors[name] ? errors[name] : null;

  if (phone && value === '') {
    value = '+7';
  }

  const handleFocus = (): void => {
    AnalyticsService.trackEvent(`${name}_input`);
  };
  const handleBlur = (): void => {
    AnalyticsService.trackEvent(`${name}_input_finish`);
  };

  useEffect(() => {
    !errorMsg ? setChecked(true) : setChecked(false);
  }, [errorMsg]);
  useEffect(() => {
    if (setSmsCode) {
      setSmsCode(value);
    }
  }, [value]);

  return (
    <View style={appStyles.flexBlock}>
      <FloatingLabelInput
        value={value}
        onChangeText={onChange(name)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label={label}
        hintTextColor={constants.colors.primaryText}
        rightComponent={
          value !== '' && value !== '+7' && checked ? (
            <View style={appStyles.checkContainer}>
              <AntIcons
                name="check"
                size={20}
                color={constants.colors.primaryText}
              />
            </View>
          ) : undefined
        }
        containerStyles={appStyles.inputContainer}
        inputStyles={appStyles.input}
        {...props}
      />

      {errorMsg ? <ErrorMessage>{errorMsg}</ErrorMessage> : null}
    </View>
  );
};

export default FormInput;
