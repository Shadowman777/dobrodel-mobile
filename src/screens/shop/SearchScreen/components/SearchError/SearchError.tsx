import React from 'react';
import {Dispatch} from 'redux';
import {View, Text, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

import AppButton from 'components/app/AppButton/AppButton';

import {setSearch} from 'store/slices/shopSlice/shopSlice';

import appStyles from 'assets/styles/appStyles';

const {width} = Dimensions.get('window');

const SearchError: React.FC<{dispatch: Dispatch}> = ({dispatch}) => {
  return (
    <View style={[appStyles.flexCenter, appStyles.grow]}>
      <View style={[appStyles.grow, appStyles.flexCenter]}>
        <FastImage
          source={require('assets/images/searchErrorImg.png')}
          resizeMode={FastImage.resizeMode.contain}
          style={{width: 294, height: 284}}
        />
        <Text
          style={[
            appStyles.appTitle,
            appStyles.textCenter,
            {marginBottom: 20},
          ]}>
          Это что-то новенькое
        </Text>
        <Text style={[appStyles.appSubtitle, {marginBottom: 25}]}>
          Мы обыскались, но такого не нашли
        </Text>
        <View style={{width: width * 0.7}}>
          <AppButton
            title="Очистить поиск"
            onPress={() => dispatch(setSearch(''))}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchError;
