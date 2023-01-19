import React from 'react';
import {ImageBackground, ViewStyle, StyleProp} from 'react-native';

import styles from './styles';

interface IAppImageBackground {
  source: string;
  style?: StyleProp<ViewStyle>;
}

const AppImageBackground: React.FC<IAppImageBackground> = ({
  children,
  ...props
}) => {
  const {source, style} = props;

  return (
    <ImageBackground
      source={{uri: source}}
      resizeMode="cover"
      resizeMethod="resize"
      imageStyle={styles.appImageBorderRadius}
      style={style}>
      {children || null}
    </ImageBackground>
  );
};

export default AppImageBackground;
