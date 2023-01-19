import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity, View, StyleSheet, Platform} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import AntIcons from 'react-native-vector-icons/AntDesign';

import {useAppSelector} from 'hooks/appHooks';
import {setSearch} from 'store/slices/shopSlice/shopSlice';

import appStyles from 'assets/styles/appStyles';

const HeaderSearch = () => {
  const [isFocused, setFocused] = useState<boolean>(false);
  const searchValue = useAppSelector(state => state.shop.search);

  const dispatch = useDispatch();

  const RightButton = () => (
    <TouchableOpacity onPress={() => dispatch(setSearch(''))} style={{top: 4}}>
      <AntIcons name="close" size={22} color="#323232" />
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        appStyles.flexBlock,
        {top: Platform.OS === 'ios' ? 20 : undefined},
      ]}>
      <FloatingLabelInput
        value={searchValue}
        onChangeText={(e: string) => dispatch(setSearch(e))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus={true}
        label=""
        staticLabel={true}
        hint="Напишите название продукта..."
        hintTextColor="#c9c9c9"
        rightComponent={<RightButton />}
        containerStyles={{
          ...styles.searchContainer,
          borderColor: isFocused ? 'yellow' : '#c9c9c9',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    borderWidth: 1,
    borderRadius: 200,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginLeft: -18,
  },
});

export default React.memo(HeaderSearch);
