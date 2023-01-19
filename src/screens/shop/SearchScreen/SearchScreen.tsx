import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Keyboard, StatusBar, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import SearchProducts from './components/SearchProducts/SearchProducts';
import SearchError from './components/SearchError/SearchError';

import {useAppSelector} from 'hooks/appHooks';
import {setSearch, deleteSearchResults} from 'store/slices/shopSlice/shopSlice';
import {searchProducts} from 'store/slices/shopSlice/shopThunks';

import appStyles from 'assets/styles/appStyles';

const SearchScreen = () => {
  const [isEndReached, setEndReached] = useState<boolean>(false);

  const searchValue = useAppSelector(state => state.shop.search);
  const searchResults = useAppSelector(state => state.shop.searchResults);

  const dispatch = useDispatch();

  let searchScreenContent;
  if (searchResults && searchResults.products.length === 0) {
    searchScreenContent = <SearchError dispatch={dispatch} />;
  } else if (searchResults) {
    searchScreenContent = (
      <SearchProducts
        products={searchResults.products}
        searchValue={searchValue}
        isEndReached={isEndReached}
        setEndReached={setEndReached}
      />
    );
  }

  const dismissKeyboard = (): void => {
    Keyboard.dismiss();
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(setSearch(''));
      };
    }, []),
  );

  useEffect(() => {
    setEndReached(false);

    if (searchValue !== '') {
      const payload = {
        name: searchValue,
        offset: 0,
        limit: 10,
        setEndReached,
      };

      dispatch(searchProducts(payload));
    } else {
      dispatch(deleteSearchResults());
    }
  }, [searchValue]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={dismissKeyboard}
      style={appStyles.grow}>
      <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        {searchScreenContent}
      </>
    </TouchableOpacity>
  );
};

export default SearchScreen;
