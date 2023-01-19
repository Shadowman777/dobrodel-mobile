import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import constants from 'assets/styles/constants';
import appStyles from 'assets/styles/appStyles';

interface IOnboardingPaginationProps {
  isOnboarding: boolean;
  slidesNumber: number;
  activeSlide: number;
  scenePercent: number;
  closeOnboarding: () => void;
}

const OnboardingPagination: React.FC<IOnboardingPaginationProps> = props => {
  const getBackgroundColor = useCallback(
    (index: number, side: 'left' | 'right'): string => {
      if (side === 'left') {
        if (index <= props.activeSlide) {
          return constants.colors.primary;
        } else {
          return '#afafaf';
        }
      } else {
        if (index < props.activeSlide) {
          return constants.colors.primary;
        } else if (index === props.activeSlide) {
          return '#f6e6a4';
        } else {
          return '#afafaf';
        }
      }
    },
    [props.activeSlide],
  );

  return (
    <View
      style={[
        styles.paginationWrapper,
        {
          justifyContent: !props.isOnboarding ? 'flex-end' : 'space-between',
        },
      ]}>
      {props.isOnboarding ? (
        <View style={[appStyles.alignCenterRow, appStyles.center]}>
          {Array(props.slidesNumber - 2)
            .fill(0)
            .map((item, index) => (
              <View
                key={index.toString()}
                style={[appStyles.alignCenterRow, styles.paginationBar]}>
                <View
                  style={{
                    backgroundColor: getBackgroundColor(index, 'left'),
                    width:
                      index === props.activeSlide
                        ? `${props.scenePercent}%`
                        : '100%',
                    height: 3,
                  }}
                />
                <View
                  style={{
                    backgroundColor: getBackgroundColor(index, 'right'),
                    width:
                      index === props.activeSlide
                        ? `${100 - props.scenePercent}%`
                        : 0,
                    height: 3,
                  }}
                />
              </View>
            ))}
        </View>
      ) : null}
      <TouchableOpacity onPress={props.closeOnboarding}>
        <Ionicons
          name="ios-close-outline"
          size={26}
          color={constants.colors.primaryText}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingPagination;
