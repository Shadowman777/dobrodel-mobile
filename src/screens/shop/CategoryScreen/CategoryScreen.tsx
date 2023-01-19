import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {useRoute, useFocusEffect, RouteProp} from '@react-navigation/native';
import useScroll from 'hooks/sharedHooks/useScroll';

import ProductsSection from 'screens/shop/components/ProductsSection/ProductsSection';
import Breadcrumb from 'components/app/Breadcrumb/Breadcrumb';
import AppLoading from 'components/app/AppLoading/AppLoading';

import {useAppSelector} from 'hooks/appHooks';
import {MainCategory} from 'types/shop/shopTypes';
import {getCategories} from 'store/slices/shopSlice/shopThunks';
import {setCartButtonVisible} from 'store/slices/shopSlice/shopSlice';

import AnalyticsService from 'services/AnalyticsService';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

type CategoryRouteProps = {
  Category: {
    categoryId: number;
    categoryName: string;
  };
};

const CategoryScreen = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const {flatListRef, handleOnScrollToIndexFailed} = useScroll(activeIndex);

  const categories = useAppSelector(state => state.shop.categories);
  const loading = useAppSelector(state => state.loading.mainLoading);

  const route = useRoute<RouteProp<CategoryRouteProps, 'Category'>>();
  const {categoryId, categoryName} = route.params;

  const dispatch = useDispatch();

  const scrollToCategory = useCallback(
    (index: number, category_name: string) => {
      setActiveIndex(index);
      AnalyticsService.trackEvent('scroll_to_category', {
        categoryName: category_name,
      });
    },
    [],
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCategories({categoryId, categoryName, is_all: true}));
      dispatch(setCartButtonVisible(true));
    }, []),
  );

  if (!categories || categories.length === 0) {
    return null;
  }

  const productsCategory = (category: MainCategory): JSX.Element => (
    <ProductsSection
      categoryId={category.id}
      categoryName={category.name}
      products={category.products}
      key={category.id.toString()}
      showAll={false}
      showHeader
      subCategory
    />
  );

  const flatListHeader = (
    <>
      <View style={styles.categoryTitleContainer}>
        <Text style={styles.categoryTitle}>{categoryName}</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.subCategoriesContainer}
        style={{flexGrow: 0}}>
        {categories.map((category, index) =>
          category.products && category.products.length > 0 ? (
            <Breadcrumb
              title={category.name}
              onPress={() => scrollToCategory(index, category.name)}
              rightIcon
              key={category.id.toString()}
            />
          ) : null,
        )}
      </ScrollView>
    </>
  );

  return (
    <>
      {loading ? (
        <AppLoading loading={loading} />
      ) : (
        <FlatList
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={categories}
          renderItem={({item}) => productsCategory(item)}
          keyExtractor={item => item.id.toString()}
          initialScrollIndex={activeIndex}
          onScrollToIndexFailed={handleOnScrollToIndexFailed}
          ListHeaderComponent={flatListHeader}
          contentContainerStyle={[styles.container, appStyles.grow]}
        />
      )}
    </>
  );
};

export default CategoryScreen;
