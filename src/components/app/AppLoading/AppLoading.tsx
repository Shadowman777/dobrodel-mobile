import React from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';

import Spinner from 'assets/icons/spinner.svg';

import appStyles from 'assets/styles/appStyles';
import useRotate from 'hooks/sharedHooks/useRotate';

interface IAppLoadingProps {
  height?: number;
  marginRight?: number;
  loading?: boolean;
  width?: number;
}

const AppLoading: React.FC<IAppLoadingProps> = ({
  height = 110,
  marginRight = 0,
  loading = false,
  width = 110,
}) => {
  const loadingStyles = useRotate(loading);

  return (
    <View style={[appStyles.grow, appStyles.flexCenter, {marginRight}]}>
      <Animated.View style={loadingStyles}>
        <Spinner height={height} width={width} />
      </Animated.View>
    </View>
  );
};

export default AppLoading;
