import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProductItem from './components/ProductItem/ProductItem';

import {Product} from 'types/shop/shopTypes';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import constants from 'assets/styles/constants';

interface IProductsCategoryProps {
  categoryId?: number;
  categoryName?: string;
  subCategory?: boolean;
  secondary?: boolean;
  products: Product[] | {[k: string]: Product};
  showAll?: boolean;
  showLimit?: number;
  showHeader?: boolean;
  scrollEnabled?: boolean;
}

const ProductsSection: React.FC<IProductsCategoryProps> = ({
  categoryId,
  categoryName,
  subCategory = false,
  secondary = false,
  products,
  showAll = true,
  showLimit = undefined,
  showHeader = false,
  scrollEnabled = true,
}) => {
  const navigation = useNavigation<StackNavigationProp<{route: {}}>>();

  const checkProductsLength = useCallback((): boolean => {
    if (Array.isArray(products) && products.length > 0) {
      return true;
    } else if (Object.keys(products).length > 0) {
      return true;
    }

    return false;
  }, [products]);

  const navigateToCategory = (): void => {
    if (secondary) {
      navigation.navigate('SecondaryCategory' as any, {
        categoryName: categoryName,
        products: products,
      });
    } else {
      navigation.push('Category' as any, {
        categoryId: categoryId,
        categoryName: categoryName,
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <View style={{marginVertical: subCategory ? 0 : 5}}>
      {showHeader ? (
        <TouchableOpacity
          activeOpacity={!showAll ? 1 : undefined}
          onPress={
            checkProductsLength() && showAll ? navigateToCategory : undefined
          }>
          <View
            style={[
              appStyles.justifyBetweenRow,
              appStyles.alignEnd,
              appStyles.appSectionHeader,
            ]}>
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={appStyles.appSectionTitle}>
                {categoryName}
              </Text>
            </View>
            {checkProductsLength() && showAll ? (
              <View>
                <Ionicons name="ios-arrow-forward" size={25} color="#000" />
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      ) : null}
      <ScrollView
        bounces={false}
        horizontal={!subCategory}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        style={styles.productsContentContainer}
        contentContainerStyle={
          subCategory ? {...appStyles.row, flexWrap: 'wrap'} : undefined
        }>
        {Array.isArray(products)
          ? products
              .slice(0, showLimit ?? products.length)
              .map((product, index) => (
                <ProductItem
                  product={product}
                  index={index}
                  subCategory={subCategory}
                  key={product.id}
                />
              ))
          : Object.keys(products)
              .slice(0, showLimit ?? Object.keys(products).length)
              .map((key, index) => (
                <ProductItem
                  product={products[key]}
                  index={index}
                  subCategory={subCategory}
                  key={products[key].id}
                />
              ))}
        {showAll ? (
          <TouchableOpacity
            onPress={navigateToCategory}
            style={styles.watchAllContainer}>
            <View style={appStyles.alignCenter}>
              <Ionicons
                name="ios-arrow-forward"
                size={22}
                color={constants.colors.primary}
              />
              <Text style={styles.watchAllText}>Смотреть всё</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ProductsSection;
