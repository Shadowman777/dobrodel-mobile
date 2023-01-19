import React, {useState, useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ActionsSection from 'screens/shop/components/ActionsSection/ActionsSection';
import CatalogSection from 'screens/shop/components/CatalogSection/CatalogSection';
import ProductsSection from 'screens/shop/components/ProductsSection/ProductsSection';
import ZoneDeleteModal from './components/ZoneDeleteModal/ZoneDeleteModal';
import NewYearBanner from './components/NewYearBanner/NewYearBanner';
import AppLoading from 'components/app/AppLoading/AppLoading';
import InfoBlock from 'components/app/InfoBlock/InfoBlock';

import {useAppSelector} from 'hooks/appHooks';
import {
  getCatalogCategories,
  getRecentlyViewedProducts,
  getPopularProducts,
  getTopProducts,
} from 'store/slices/shopSlice/shopThunks';
import {getUserNotifications} from 'store/slices/authSlice/authThunks';
import {
  setProductId,
  setDeliveryPointId,
  setCartButtonVisible,
} from 'store/slices/shopSlice/shopSlice';
import {setActionId} from 'store/slices/actionsSlice/actionsSlice';
import {
  setPaymentUrl,
  setOrderStarted,
  setEvaluationFinished,
} from 'store/slices/profileSlice/profileSlice';
import {getOrdersInfo} from 'store/slices/profileSlice/profileThunks';
import {getActions} from 'store/slices/actionsSlice/actionsThunks';

import {mmkvStorage} from 'utils/localStorage';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import constants from 'assets/styles/constants';

const MainScreen = () => {
  const [isZoneDeleteVisible, setZoneDeleteVisible] = useState<boolean>(false);

  const userNotification = useAppSelector(
    state => state.auth.user?.notification,
  );
  const settings = useAppSelector(state => state.main.settings);
  const actions = useAppSelector(state => state.actions.actions);
  const isVisibleNewYearBanner = useAppSelector(
    state => state.main.isVisibleNewYearBanner,
  );
  // const mainCategories = useAppSelector(state => state.shop.mainCategories);
  const catalogCategories = useAppSelector(
    state => state.shop.catalogCategories,
  );
  const recentlyViewedProducts = useAppSelector(
    state => state.shop.recentlyViewedProducts,
  );
  const popularProducts = useAppSelector(state => state.shop.popularProducts);
  const topProducts = useAppSelector(state => state.shop.topProducts);
  const isPayOrders = useAppSelector(state => state.profile.isPayOrders);
  const payOrdersInfo = useAppSelector(state => state.profile.payOrdersInfo);
  const deliveryZone = useAppSelector(state => state.shop.deliveryZone);
  const loading = useAppSelector(state => state.loading.mainLoading);

  const showDeliveryZone = useMemo(() => {
    return (
      settings?.selection_delivery_zone_first_login_after_registration &&
      settings?.displaying_choice_delivery_zone_when_placing_an_order &&
      deliveryZone
    );
  }, [settings, deliveryZone]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goBack = (): boolean => {
    RNExitApp.exitApp();
    return true;
  };

  const updateCatalog = (): void => {
    dispatch(getActions({offset: 0, limit: 10}));
    dispatch(getCatalogCategories());
    dispatch(getPopularProducts());
    dispatch(getTopProducts());
    checkAuthToken().then();
    dispatch(getUserNotifications());
  };

  const updateMainPage = (): void => {
    const launched = mmkvStorage.contains('hasLaunched');
    if (!launched) {
      updateCatalog();
      mmkvStorage.set('hasLaunched', true);
      mmkvStorage.set('fetchTime', +new Date());
    } else {
      const currentDate = new Date();
      const fetchTime = mmkvStorage.getNumber('fetchTime');
      if (fetchTime) {
        if ((currentDate.getTime() - fetchTime) / 60000 >= 60) {
          updateCatalog();
          mmkvStorage.set('fetchTime', +currentDate);
        }
      }
    }
  };

  const checkAuthToken = async (): Promise<void> => {
    const isAuthToken = mmkvStorage.getString('Authorization');
    if (isAuthToken) {
      dispatch(getOrdersInfo());
      dispatch(getRecentlyViewedProducts({offset: 0, limit: 10}));
    }
  };

  const clearMainVariables = (): void => {
    dispatch(setProductId(null));
    dispatch(setDeliveryPointId(null));
    dispatch(setActionId(null));
    dispatch(setPaymentUrl(''));
    dispatch(setOrderStarted(false));
    dispatch(setEvaluationFinished(false));
    dispatch(setCartButtonVisible(true));
  };

  const checkNewYearDays = useCallback((): boolean => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    let newYearDays = false;
    if (
      (currentMonth === 12 && currentDay >= 29) ||
      (currentMonth === 1 && currentDay <= 10)
    ) {
      newYearDays = true;
    }
    return newYearDays && isVisibleNewYearBanner;
  }, [isVisibleNewYearBanner]);

  useFocusEffect(
    React.useCallback(() => {
      updateMainPage();
      clearMainVariables();

      BackHandler.addEventListener('hardwareBackPress', goBack);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', goBack);
      };
    }, []),
  );

  return (
    <View style={appStyles.grow}>
      {!loading && userNotification?.data?.expiration_date ? (
        <InfoBlock
          text={'Ваш промокод закончится через'}
          expirationDate={userNotification.data.expiration_date}
        />
      ) : null}

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[appStyles.grow, {paddingBottom: 100}]}>
        <StatusBar
          translucent={false}
          backgroundColor="#fff"
          barStyle="dark-content"
        />

        {loading ? (
          <AppLoading loading={loading} />
        ) : (
          <>
            {isPayOrders ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProfileNav', {screen: 'Orders'})
                }
                style={styles.ordersNotificationOuter}>
                <View style={styles.ordersNotificationInner}>
                  <Text style={styles.ordersNotificationText}>
                    {payOrdersInfo}
                  </Text>
                  <Ionicons
                    name="ios-arrow-forward"
                    color="#e5243f"
                    size={25}
                  />
                </View>
              </TouchableOpacity>
            ) : null}

            {showDeliveryZone ? (
              <TouchableOpacity
                onPress={() => setZoneDeleteVisible(true)}
                style={[appStyles.alignCenterRow, {marginLeft: 30}]}>
                <Text style={styles.minOrderText}>{deliveryZone?.address}</Text>
                <Ionicons
                  name="ios-chevron-down-outline"
                  size={19}
                  color={constants.colors.primaryText}
                />
              </TouchableOpacity>
            ) : null}

            {actions ? <ActionsSection actions={actions} /> : null}

            {checkNewYearDays() ? <NewYearBanner /> : null}

            {catalogCategories && settings ? (
              <CatalogSection categories={catalogCategories} />
            ) : null}

            {popularProducts ? (
              <ProductsSection
                categoryName="Популярное"
                products={popularProducts.slice(0, 10)}
                secondary
                showHeader
                showLimit={10}
                showAll={popularProducts.length > 10}
              />
            ) : null}

            {topProducts ? (
              <ProductsSection
                categoryName="Топ продаж"
                products={topProducts}
                secondary
                showHeader
                showLimit={10}
                showAll={topProducts.length > 10}
              />
            ) : null}

            {recentlyViewedProducts ? (
              <ProductsSection
                categoryName="Недавно просмотренные"
                products={recentlyViewedProducts.products}
                secondary
                showHeader
                showLimit={10}
              />
            ) : null}

            {/*{mainCategories && mainCategories.length > 0*/}
            {/*  ? mainCategories.map(category => (*/}
            {/*      <ProductsSection*/}
            {/*        categoryId={category.id}*/}
            {/*        categoryName={category.name}*/}
            {/*        products={category.products}*/}
            {/*        key={category.id.toString()}*/}
            {/*        showHeader*/}
            {/*      />*/}
            {/*    ))*/}
            {/*  : null}*/}

            <ZoneDeleteModal
              isModalVisible={isZoneDeleteVisible}
              setModalVisible={setZoneDeleteVisible}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default MainScreen;
