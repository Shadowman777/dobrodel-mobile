import React from 'react';
import {Dispatch} from 'redux';
import {View, Text} from 'react-native';

import Breadcrumb from 'components/app/Breadcrumb/Breadcrumb';

import {Product} from 'types/shop/shopTypes';
import {setProductId} from 'store/slices/shopSlice/shopSlice';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

interface ISearchPopular {
  dispatch: Dispatch;
  popularProducts: Product[];
}

const SearchPopular: React.FC<ISearchPopular> = ({
  dispatch,
  popularProducts,
}) => {
  if (!popularProducts || popularProducts.length === 0) {
    return null;
  }

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Популярное</Text>
      </View>
      <View style={[styles.queriesContainer, appStyles.alignCenterRow]}>
        {popularProducts.map(product => (
          <Breadcrumb
            title={product.name}
            onPress={() => dispatch(setProductId(product.id))}
            rightIcon
            search
            key={product.id.toString()}
          />
        ))}
      </View>
    </View>
  );
};

export default SearchPopular;
