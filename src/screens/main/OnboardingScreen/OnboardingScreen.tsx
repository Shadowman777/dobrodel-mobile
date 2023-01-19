import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {FlatList, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import OnboardingSlide from './components/OnboardingSlide/OnboardingSlide';
import OnboardingPagination from './components/OnboardingPagination/OnboardingPagination';

import {useAppSelector} from 'hooks/appHooks';
import {setViewedOnboarding} from 'store/slices/mainSlice/mainSlice';

import AnalyticsService from 'services/AnalyticsService';

import {slides} from './onboardingSlides';

import appStyles from 'assets/styles/appStyles';

const OnboardingScreen = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [scenePercent, setScenePercent] = useState<number>(0);
  const flatListRef = React.useRef<any>();
  const sceneInterval = React.useRef<any>();

  const settings = useAppSelector(state => state.main.settings);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const closeOnboarding = useCallback((): void => {
    AnalyticsService.trackEvent('close_onboarding').then();

    dispatch(setViewedOnboarding(true));

    if (settings?.authorization_required) {
      navigation.navigate('AuthNav', {screen: 'AuthForm'});
    } else {
      navigation.navigate('ShopNav', {screen: 'Main'});
    }
  }, [settings]);

  const onSwipePageChange = useCallback(({viewableItems}) => {
    if (!viewableItems[0]) {
      return;
    }
    setActiveSlide(viewableItems[0].index);
    setScenePercent(0);
  }, []);

  const clearSceneInterval = useCallback(() => {
    if (sceneInterval.current) {
      clearInterval(sceneInterval.current);
    }
  }, [sceneInterval.current]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sceneInterval.current) {
          clearInterval(sceneInterval.current);
        }
      };
    }, []),
  );

  useEffect(() => {
    setActiveSlide(0);
  }, []);

  useEffect(() => {
    if (scenePercent === 100) {
      if (sceneInterval.current) {
        clearInterval(sceneInterval.current);
      }
      setActiveSlide(activeSlide + 1);
      setScenePercent(0);
    } else if (scenePercent === 0) {
      if (sceneInterval.current) {
        clearInterval(sceneInterval.current);
      }
      sceneInterval.current = setInterval(() => {
        setScenePercent(prevState => prevState + 1);
      }, 0.07 * 1000);
    }
  }, [scenePercent]);

  useEffect(() => {
    if (activeSlide <= slides.length - 1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: true, index: activeSlide});
    }
    if (activeSlide === slides.length - 1) {
      AnalyticsService.trackEvent('swipe_onboarding_to_the_end');
    }
  }, [activeSlide]);

  return (
    <SafeAreaView edges={['top']} style={appStyles.grow}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <OnboardingPagination
        closeOnboarding={closeOnboarding}
        activeSlide={activeSlide}
        slidesNumber={slides.length}
        scenePercent={scenePercent}
        isOnboarding
      />
      <FlatList
        ref={flatListRef}
        data={slides}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <OnboardingSlide
            index={index}
            title={item.title}
            subTitle={item.subTitle}
            description={item.description}
            image={item.image}
            clearSceneInterval={clearSceneInterval}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onSwipePageChange}
        viewabilityConfig={{itemVisiblePercentThreshold: 100}}
        initialNumToRender={1}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
