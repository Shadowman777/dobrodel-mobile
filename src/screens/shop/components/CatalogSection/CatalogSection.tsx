import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Shadow} from 'react-native-shadow-2';

import {SubCategory} from 'types/shop/shopTypes';

import {ShadowPresets} from 'assets/styles/constants';
import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const CatalogItem: React.FC<{
  sectionTitle: string;
  item: SubCategory;
  index: number;
  navigation: any;
}> = ({sectionTitle, item, index, navigation}) => (
  <Shadow
    {...ShadowPresets.bar}
    containerViewStyle={[
      styles.catalogBlockContainer,
      {marginRight: index % 2 === 0 ? '3.9%' : 0},
    ]}
    viewStyle={styles.catalogBlockContainerView}>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Category', {
          popular: sectionTitle.includes('Популярные'),
          categoryId: item.id,
          categoryName: item.name,
        })
      }
      style={styles.catalogBlock}>
      <FastImage
        source={
          item.image_url
            ? {uri: item.image_url}
            : require('../../../../assets/images/not_found.png')
        }
        resizeMode={FastImage.resizeMode.cover}
        style={styles.catalogBlockImage}
      />
      <View style={{paddingRight: 5}}>
        <Text style={styles.catalogBlockText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  </Shadow>
);

const CatalogSection: React.FC<{
  sectionTitle?: string;
  categories?: SubCategory[];
}> = ({sectionTitle = 'Каталог товаров', categories = []}) => {
  const navigation = useNavigation();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View style={{marginTop: 8}}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Catalog', {
            sectionTitle: sectionTitle,
            categories: categories,
          })
        }>
        <View
          style={[
            appStyles.justifyBetweenRow,
            appStyles.alignEnd,
            appStyles.appSectionHeader,
          ]}>
          <View>
            <Text style={appStyles.appSectionTitle}>{sectionTitle}</Text>
          </View>
          <View>
            <Ionicons name="ios-arrow-forward" size={25} color="#000" />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.catalogBlocksWrapper}>
        {categories &&
          categories.length > 0 &&
          categories.map((category, index) => (
            <CatalogItem
              sectionTitle={sectionTitle}
              item={category}
              index={index}
              navigation={navigation}
              key={category.id}
            />
          ))}
      </View>
    </View>
  );
};

export default React.memo(CatalogSection);
