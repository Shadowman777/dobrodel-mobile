import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, ScrollView, Text} from 'react-native';
import {useFocusEffect, useRoute, RouteProp} from '@react-navigation/native';

import AppLoading from 'components/app/AppLoading/AppLoading';
import ProductsSection from 'screens/shop/components/ProductsSection/ProductsSection';
import ExpandableText from 'components/app/ExpandableText/ExpandableText';

import {useAppSelector} from 'hooks/appHooks';
import {getActionProducts} from 'store/slices/actionsSlice/actionsThunks';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

type ActionProductsScreenRoute = {
  ActionProductsScreen: {
    id_news: number;
  };
};

const ActionProductsScreen = () => {
  const [shortText, setShortText] = useState<string>('');

  const action = useAppSelector(state => state.actions.action);
  const actionProducts = useAppSelector(state => state.actions.actionProducts);
  const mainLoading = useAppSelector(state => state.loading.mainLoading);

  const route =
    useRoute<RouteProp<ActionProductsScreenRoute, 'ActionProductsScreen'>>();
  const {id_news} = route.params;

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getActionProducts(id_news));
    }, []),
  );

  if (!action) {
    return null;
  }

  return (
    <>
      {mainLoading ? (
        <AppLoading loading={mainLoading} />
      ) : (
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            appStyles.grow,
            styles.actionsProductsWrapper,
          ]}>
          <View style={styles.actionHead}>
            <View style={styles.actionTitleWrapper}>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </View>
            {action.description ? (
              <ExpandableText
                text={action.description}
                shortText={shortText}
                setShortText={setShortText}
                action
                marginVertical={0}
              />
            ) : null}
          </View>
          <View style={styles.actionProducts}>
            <ProductsSection
              products={actionProducts}
              showAll={false}
              showHeader={false}
              subCategory
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default React.memo(ActionProductsScreen);
