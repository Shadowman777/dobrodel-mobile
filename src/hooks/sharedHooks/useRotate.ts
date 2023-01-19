import {useEffect} from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const useRotate = (loading: boolean) => {
  const sharedAngle = useSharedValue(0);

  const angleTiming = withTiming(360, {
    duration: 1000,
    easing: Easing.linear,
  });
  const loadingStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${sharedAngle.value}deg`,
        },
      ],
    };
  });

  useEffect(() => {
    sharedAngle.value = loading ? withRepeat(angleTiming, -1) : 0;
  }, [loading]);

  return loadingStyles;
};

export default useRotate;
