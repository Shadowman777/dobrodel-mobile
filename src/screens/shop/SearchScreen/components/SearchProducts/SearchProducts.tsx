import React, {useCallback, useState, Dispatch, SetStateAction} from 'react';
import {useDispatch} from 'react-redux';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

import SearchProductItem from '../SearchProductItem/SearchProductItem';

import {Product} from 'types/shop/shopTypes';
import {searchProducts} from 'store/slices/shopSlice/shopThunks';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

interface ISearchProductsProps {
  products: Product[] | {[k: string]: Product};
  searchValue: string;
  isEndReached: boolean;
  setEndReached: Dispatch<SetStateAction<boolean>>;
}

const SearchProducts: React.FC<ISearchProductsProps> = props => {
  const {products, searchValue, isEndReached, setEndReached} = props;

  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [halfScrollHeight, setHalfScrollHeight] = useState<number>(0);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [scrollStop, setScrollStop] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (scrollHeight > 0) {
        const scrollOffset = event.nativeEvent.contentOffset.y;

        if (scrollOffset >= halfScrollHeight && !isEndReached && !scrollStop) {
          const payload = {
            name: searchValue,
            offset: currentOffset + 10,
            limit: 10,
            setEndReached,
          };

          dispatch(searchProducts(payload));

          setCurrentOffset(currentOffset + 10);
          setScrollStop(true);
        }
      }
    },
    [scrollHeight, halfScrollHeight, currentOffset, isEndReached, scrollStop],
  );

  const handleContentSizeChange = useCallback(
    (width: number, height: number) => {
      const halfHeight = height / 2;

      setScrollHeight(halfHeight);
      setHalfScrollHeight((halfHeight * 50) / 100);

      if (scrollStop) {
        setScrollStop(false);
      }
    },
    [scrollStop],
  );

  const productItem = ({item}: {item: Product}) => (
    <SearchProductItem product={item} />
  );

  return (
    <FlatList
      data={Array.isArray(products) ? products : Object.values(products)}
      renderItem={productItem}
      keyExtractor={item => item.id.toString()}
      onScroll={handleScroll}
      onContentSizeChange={handleContentSizeChange}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[appStyles.grow, styles.productsList]}
    />
  );
};

export default SearchProducts;
