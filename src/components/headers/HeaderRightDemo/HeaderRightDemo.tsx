import React from 'react';
import {View, Text} from 'react-native';

import {useAppSelector} from 'hooks/appHooks';

import styles from './styles';
import appStyles from 'assets/styles/appStyles';

const HeaderRightDemo: React.FC<{top?: number; left?: number}> = ({
  top = 5,
  left = -10,
}) => {
  const settings = useAppSelector(state => state.main.settings);

  if (settings && !settings.demo_mode) {
    return null;
  }

  return (
    <View style={[appStyles.flexCenter, styles.demoTextWrapper, {top, left}]}>
      <Text style={styles.demoText}>Демо-режим</Text>
    </View>
  );
};

export default React.memo(HeaderRightDemo);
