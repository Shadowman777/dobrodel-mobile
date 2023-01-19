import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';
import styles from './styles';

interface IAppRadioProps {
  label: string;
  active: boolean;
  onPress: () => void;
  marginTop?: number;
}

const AppRadio: React.FC<IAppRadioProps> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...appStyles.alignCenterRow, marginTop: props.marginTop}}>
      <View
        style={{
          ...styles.outerRadio,
          borderColor: props.active
            ? constants.colors.primary
            : constants.colors.primaryText,
        }}>
        {props.active && <View style={styles.innerRadio} />}
      </View>
      <Text style={styles.radioLabel}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default AppRadio;
