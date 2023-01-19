import React from 'react';
import {useDispatch} from 'react-redux';
import {ScrollView, StatusBar} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {useRoute, useFocusEffect, RouteProp} from '@react-navigation/native';

import AppLoading from 'components/app/AppLoading/AppLoading';

import {useAppSelector} from 'hooks/appHooks';
import {IPage} from 'types/main/mainTypes';
import {getPage} from 'store/slices/mainSlice/mainThunks';

import appStyles from 'assets/styles/appStyles';
import stylesHtml from './stylesHtml';
import {trimNewLines} from 'utils/helpers';

type PageScreenRoute = {
  Page: {
    type: IPage;
  };
};

const PageScreen = () => {
  const page = useAppSelector(state => state.main.page);
  const mainLoading = useAppSelector(state => state.loading.mainLoading);
  const route = useRoute<RouteProp<PageScreenRoute, 'Page'>>();
  const type = route.params.type;
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getPage(type));
    }, []),
  );

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{
        ...appStyles.grow,
        backgroundColor: '#fff',
        padding: 14,
      }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {mainLoading ? (
        <AppLoading loading={mainLoading} />
      ) : (
        <HTMLView value={trimNewLines(page)} stylesheet={stylesHtml} />
      )}
    </ScrollView>
  );
};

export default PageScreen;
