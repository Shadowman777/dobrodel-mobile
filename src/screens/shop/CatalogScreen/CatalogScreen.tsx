import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {MainCategory, PopularCategory} from 'types/shop/shopTypes';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

type CatalogRouteProps = {
  Catalog: {
    sectionTitle: string;
    categories: MainCategory[];
    popularCategories: PopularCategory[];
  };
};

const CatalogItem: React.FC<{
  sectionTitle: string;
  category: MainCategory | PopularCategory;
  navigation: any;
}> = ({sectionTitle, category, navigation}) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('Category', {
        popular: sectionTitle.includes('Популярные'),
        categoryId: category.id,
        categoryName: category.name,
      })
    }
    style={styles.categoryWrapper}>
    <FastImage
      source={
        category.image_url
          ? {uri: category.image_url, priority: FastImage.priority.high}
          : require('../../../assets/images/not_found.png')
      }
      resizeMode={FastImage.resizeMode.cover}
      style={{height: 176}}
    />
    <View
      style={[
        appStyles.alignCenter,
        appStyles.justifyBetweenRow,
        {flex: 1, paddingHorizontal: 8},
      ]}>
      <Text style={styles.categoryTitle}>{category.name}</Text>
      <Ionicons name="ios-arrow-forward-outline" size={20} color="#000" />
    </View>
  </TouchableOpacity>
);

const CatalogScreen = () => {
  const route = useRoute<RouteProp<CatalogRouteProps, 'Catalog'>>();
  const {sectionTitle, categories, popularCategories} = route.params;
  const navigation = useNavigation();

  if (categories.length === 0 && popularCategories.length === 0) {
    return null;
  }

  return (
    <View style={appStyles.grow}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[appStyles.grow, {paddingBottom: 100}]}>
        <View>
          <View style={styles.titleWrapper}>
            <Text style={appStyles.appTitle}>{sectionTitle}</Text>
          </View>

          <View style={appStyles.alignCenter}>
            {categories && categories.length > 0
              ? categories.map((category: any) => (
                  <CatalogItem
                    sectionTitle={sectionTitle}
                    category={category}
                    navigation={navigation}
                    key={category.id.toString()}
                  />
                ))
              : null}
            {popularCategories && popularCategories.length > 0
              ? popularCategories.map((category: any) => (
                  <CatalogItem
                    sectionTitle={sectionTitle}
                    category={category}
                    navigation={navigation}
                    key={category.id.toString()}
                  />
                ))
              : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CatalogScreen;
