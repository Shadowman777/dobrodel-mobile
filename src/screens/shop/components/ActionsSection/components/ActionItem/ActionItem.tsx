import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity, Text} from 'react-native';
import {Config} from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import {Shadow} from 'react-native-shadow-2';

import AppImageBackground from 'components/app/AppImageBackground/AppImageBackground';

import {Action} from 'types/actions/actionsTypes';
import {getActionWithProducts} from 'store/slices/actionsSlice/actionsThunks';

import {ShadowPresets} from 'assets/styles/constants';
import styles from './styles';

const ActionItem: React.FC<{action: Action}> = ({action}) => {
  const dispatch = useDispatch();

  if (!action) {
    return null;
  }

  return (
    <Shadow
      {...ShadowPresets.bar}
      containerViewStyle={styles.actionItemContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => dispatch(getActionWithProducts(action.id))}
        style={styles.actionItem}>
        <AppImageBackground
          source={`${Config.STATIC_URL}${action.image_preview_url}`}
          style={styles.actionItemWrapper}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            colors={['rgba(36, 37, 45, 0)', 'rgba(23, 24, 27, .4)']}
            style={styles.actionItemContent}>
            <Text style={styles.actionItemText}>{action.title}</Text>
          </LinearGradient>
        </AppImageBackground>
      </TouchableOpacity>
    </Shadow>
  );
};

export default ActionItem;
