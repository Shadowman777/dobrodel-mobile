import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import constants from 'assets/styles/constants';

interface IQuantityButton {
  isInCart?: boolean;
  onPress: () => void;
  quantityType?: 'minus' | 'plus';
}

const QuantityButton: React.FC<IQuantityButton> = ({
  isInCart = false,
  onPress,
  quantityType = 'plus',
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.quantityButton,
      appStyles.flexCenter,
      {
        borderColor:
          isInCart && quantityType === 'plus'
            ? 'transparent'
            : constants.colors.primary,
        backgroundColor:
          isInCart && quantityType === 'plus'
            ? constants.colors.primary
            : 'transparent',
        width:
          isInCart && quantityType === 'plus' && Platform.OS === 'android'
            ? 39.5
            : 36,
        height:
          isInCart && quantityType === 'plus' && Platform.OS === 'android'
            ? 39.5
            : 36,
      },
    ]}>
    <Entypo
      name={quantityType}
      size={25}
      color={isInCart && quantityType === 'plus' ? '#fff' : '#000'}
    />
  </TouchableOpacity>
);

export default QuantityButton;
