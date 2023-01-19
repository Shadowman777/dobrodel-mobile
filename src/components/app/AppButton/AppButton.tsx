import React from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native-elements';
import Animated from 'react-native-reanimated';

import useRotate from 'hooks/sharedHooks/useRotate';

import SpinnerDark from 'assets/icons/spinner-dark.svg';

import styles from './styles';
import appStyles from 'assets/styles/appStyles';

interface IAppButtonProps {
  title: string;
  titleColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  paddingVertical?: number;
  fontSize?: number;
  lineHeight?: number;
  buttonShadow?: boolean;
}

const AppButton: React.FC<IAppButtonProps> = ({
  title,
  backgroundColor = '#f8cb16',
  borderColor,
  titleColor = '#333',
  onPress,
  disabled = false,
  loading = false,
  paddingVertical = 13,
  fontSize = 14,
  lineHeight = 19,
  buttonShadow = false,
}) => {
  const loadingStyles = useRotate(loading);

  const loadingContent = (
    <Animated.View style={loadingStyles}>
      <SpinnerDark height={30} width={30} />
    </Animated.View>
  );

  const buttonTitle = (
    <Text
      style={{
        ...styles.buttonText,
        color: titleColor,
        fontSize,
        lineHeight,
      }}>
      {title}
    </Text>
  );

  const borderConfigs = {
    borderWidth: 1,
    borderColor,
  };

  return (
    <Button
      title={loading ? loadingContent : buttonTitle}
      onPress={onPress}
      buttonStyle={[
        styles.buttonContainer,
        {
          backgroundColor,
          ...(borderColor ? borderConfigs : {}),
          paddingVertical: !loading ? paddingVertical : paddingVertical - 5,
        },
      ]}
      containerStyle={[
        buttonShadow && appStyles.appButtonShadow,
        {width: '100%', borderRadius: 100},
      ]}
      disabled={disabled || loading}
    />
  );
};

export default AppButton;
