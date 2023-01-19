import React from 'react';
import {View, Text, Platform} from 'react-native';

import appStyles from 'assets/styles/appStyles';

const HeaderText: React.FC<{title: string}> = ({title}) => (
  <View
    style={[
      appStyles.flexBlock,
      Platform.OS === 'ios' ? appStyles.justifyEnd : appStyles.justifyCenter,
      {marginBottom: Platform.OS === 'ios' ? 8 : 0},
    ]}>
    <Text style={appStyles.appHeaderTitle}>{title}</Text>
  </View>
);

export default HeaderText;
