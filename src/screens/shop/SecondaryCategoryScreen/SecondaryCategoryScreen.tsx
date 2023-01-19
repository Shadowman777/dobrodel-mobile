import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

import ProductsSection from 'screens/shop/components/ProductsSection/ProductsSection';

import appStyles from 'assets/styles/appStyles';

const SecondaryCategoryScreen = () => {
  const route = useRoute();
  const {categoryName, products}: any = route.params;

  return (
    <View style={appStyles.grow}>
      <ScrollView bounces={false} contentContainerStyle={styles.container}>
        <Text style={{...appStyles.appTitle, marginBottom: 15}}>
          {categoryName}
        </Text>
        <ProductsSection products={products} showAll={false} subCategory />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...appStyles.grow,
    padding: 15,
    paddingBottom: 100,
  },
});

export default SecondaryCategoryScreen;
