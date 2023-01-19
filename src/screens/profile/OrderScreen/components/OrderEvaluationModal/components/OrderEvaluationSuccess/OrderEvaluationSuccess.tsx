import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

import AppButton from 'components/app/AppButton/AppButton';

import {IHandles} from 'react-native-modalize/lib/options';
import {setEvaluationFinished} from 'store/slices/profileSlice/profileSlice';

import {navigate} from 'navigation/RootNavigation';

import styles from './styles';

const OrderEvaluationSuccess: React.FC<{
  modalRef: React.MutableRefObject<IHandles | undefined>;
}> = ({modalRef}) => {
  const dispatch = useDispatch();

  const closeEvaluation = (): void => {
    modalRef.current && modalRef.current.close();
    navigate('ShopNav', {screen: 'Main'});
    dispatch(setEvaluationFinished(false));
  };

  return (
    <View style={styles.evaluationSuccessContainer}>
      <FastImage
        source={require('assets/images/evaluation-logo.png')}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.evaluationSuccessImage}
      />
      <Text style={styles.evaluationSuccessTitle}>
        Благодарим за ваше мнение!
      </Text>
      <Text style={styles.evaluationSuccessSubtitle}>
        Мы обязательно учтем вашу оценку и коментарии для улучшения сервиса
      </Text>
      <View style={styles.evaluationSuccessButtonContainer}>
        <AppButton title="Перейти на главную" onPress={closeEvaluation} />
      </View>
    </View>
  );
};

export default OrderEvaluationSuccess;
