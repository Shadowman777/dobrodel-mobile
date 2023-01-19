import {Dimensions} from 'react-native';
import {ShadowProps} from 'react-native-shadow-2';

import {version} from '../../../package.json';

const {height, width} = Dimensions.get('window');

export const APP_VERSION = version;

const BAR_SHADOW_COLOR = 'rgba(0, 0, 0, .1)';

export const ShadowPresets = {
  bar: {
    distance: 1,
    startColor: BAR_SHADOW_COLOR,
    finalColor: BAR_SHADOW_COLOR,
    radius: 6,
    offset: [0, 2],
  } as unknown as ShadowProps,
};

export default {
  colors: {
    primary: '#f8cb16',
    primaryText: '#252628',
    secondary: '#333',
    dimPrimary: '#FFEFB6',
  },
  screen: {
    height: height,
    width: width,
  },
};
