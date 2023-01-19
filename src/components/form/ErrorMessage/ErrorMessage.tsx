import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const ErrorMessage = ({children}: {children: string}) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{children}</Text>
  </View>
);

export default ErrorMessage;
