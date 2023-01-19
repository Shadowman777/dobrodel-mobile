import React, {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  ScrollView,
  Share,
  Dimensions,
  Alert,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAppSelector} from 'hooks/appHooks';
import {setCartButtonVisible} from 'store/slices/shopSlice/shopSlice';
import appStyles from 'assets/styles/appStyles';
import styles from './styles';
import {getInviteCode} from 'store/slices/profileSlice/profileThunks';
import AppLoading from 'components/app/AppLoading/AppLoading';
import HTMLView from 'react-native-htmlview';
import stylesHtml from 'screens/main/PageScreen/stylesHtml';
import {trimNewLines} from 'utils/helpers';
import constants from 'assets/styles/constants';
const ShareScreen = () => {
  const mainLoading = useAppSelector(state => state.loading.mainLoading);
  const notInitialRender = useRef(false);
  const inviteData = useAppSelector(state => state.profile.inviteData);

  const goBack = (): boolean => {
    navigation.navigate('Menu');
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getInviteCode());
      dispatch(setCartButtonVisible(false));
      BackHandler.addEventListener('hardwareBackPress', goBack);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', goBack);
      };
    }, []),
  );

  useEffect(() => {
    if (notInitialRender.current) {
      if (!(inviteData?.invitePromoCode.length > 0)) {
        return Alert.alert('Ошибка', inviteData.error, [
          {text: 'Закрыть', onPress: () => goBack()},
        ]);
      }
    } else {
      notInitialRender.current = true;
    }
  }, [inviteData]);

  const navigation = useNavigation();
  const dispatch = useDispatch();


  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={[appStyles.flexBlock, {backgroundColor: '#fff'}]}>
      {mainLoading ? (
        <AppLoading loading={mainLoading} />
      ) : (
        inviteData?.invitePromoCode?.length > 0 && (
          <View style={styles.container}>
            <View style={appStyles.flexBlock}>
              <Text style={styles.descriptionText}>Ваш промокод:</Text>
              <TouchableOpacity
                onPress={() => {
                  Share.share({
                    message: inviteData.inviteMessageText,
                  });
                }}
                style={styles.button}>
                <Text style={styles.promoCode}>
                  {inviteData.invitePromoCode}
                </Text>
                <MaterialIcons
                  name="share"
                  color="#000"
                  style={styles.promoIcon}
                />
              </TouchableOpacity>
              <View
                style={{
                  width: constants.screen.width - 30,
                  margin: 15,
                }}>
                <HTMLView
                  value={trimNewLines(inviteData.inviteScreenText)}
                  stylesheet={stylesHtml}
                />
              </View>
            </View>
          </View>
        )
      )}
    </ScrollView>
  );
};

export default ShareScreen;
