import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import constants from 'assets/styles/constants';

const ContinueButton: React.FC<{onPress: () => void; disabled?: boolean}> = ({
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.continueButton,
        {backgroundColor: disabled ? '#e9e9e9' : constants.colors.primary},
      ]}>
      <Ionicons name="ios-chevron-forward-outline" size={17} color="#333" />
    </TouchableOpacity>
  );
};

export default ContinueButton;
