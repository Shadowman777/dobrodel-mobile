import React from 'react';
import {Image, View, Platform} from 'react-native';

import appStyles from 'assets/styles/appStyles';

const HeaderBackground = () => {
  const image = require('../../../assets/images/logo_alt.png');

  return (
    <View
      style={[
        Platform.OS === 'ios' ? appStyles.justifyEnd : appStyles.justifyCenter,
        appStyles.flexBlock,
      ]}>
      <Image
        source={image}
        style={{
          maxWidth: 123,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default React.memo(HeaderBackground);
