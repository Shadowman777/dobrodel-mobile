import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  Dimensions,
  InteractionManager,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from '@gorhom/portal';
import {FloatingLabelInput} from 'react-native-floating-label-input';

import AppLoading from 'components/app/AppLoading/AppLoading';
import AppButton from 'components/app/AppButton/AppButton';
import OrderEvaluationQuestion from './components/OrderEvaluationQuestion/OrderEvaluationQuestion';
import OrderEvaluationSuccess from './components/OrderEvaluationSuccess/OrderEvaluationSuccess';

import {useAppSelector} from 'hooks/appHooks';
import {
  evaluateOrder,
  getOrderEvaluationQuestions,
} from 'store/slices/profileSlice/profileThunks';
import {setEvaluationFinished} from 'store/slices/profileSlice/profileSlice';
import {EvaluationAnswer} from 'types/profile/profileTypes';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const {height, width} = Dimensions.get('window');

const OrderEvaluationModal: React.FC<{
  id_order: number;
  isEvaluationStarted: boolean;
  setEvaluationStarted: Dispatch<SetStateAction<boolean>>;
}> = ({id_order, isEvaluationStarted, setEvaluationStarted}) => {
  const [evaluationAnswers, setEvaluationAnswers] = useState<
    EvaluationAnswer[]
  >([]);
  const [comment, setComment] = useState<string>('');
  const modalRef = useRef<Modalize>();

  const evaluationQuestions = useAppSelector(
    state => state.profile.evaluationQuestions,
  );
  const evaluationLoading = useAppSelector(
    state => state.loading.evaluationLoading,
  );
  const evaluationFinished = useAppSelector(
    state => state.profile.evaluationFinished,
  );

  const dispatch = useDispatch();

  const evaluate = (): void => {
    const payload = {
      id_order,
      evaluation: evaluationAnswers,
      comment,
    };

    dispatch(evaluateOrder(payload));
  };
  const closeModal = (): void => {
    setEvaluationStarted(false);
    dispatch(setEvaluationFinished(false));
  };
  const handleBackButtonPress = (): boolean => {
    closeModal();

    return true;
  };

  useEffect(() => {
    if (modalRef.current) {
      if (isEvaluationStarted) {
        modalRef.current.open();
        InteractionManager.runAfterInteractions(() => {
          dispatch(getOrderEvaluationQuestions());
        });
      } else {
        modalRef.current.close();
        setEvaluationAnswers([]);
      }
    }
  }, [isEvaluationStarted]);
  useEffect(() => {
    if (evaluationQuestions && evaluationQuestions.length > 0) {
      evaluationQuestions.forEach(question => {
        setEvaluationAnswers(prevState => [
          ...prevState,
          {id_evaluation_questions: question.id, quantity: 0},
        ]);
      });
    }
  }, [evaluationQuestions]);

  let modalContent: JSX.Element = <></>;
  if (evaluationLoading) {
    modalContent = <AppLoading loading={evaluationLoading} />;
  } else if (!evaluationFinished) {
    modalContent = (
      <KeyboardAvoidingView behavior="padding" style={{width: width * 0.93}}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          style={appStyles.grow}>
          <Text style={styles.evaluationTitle}>Как вы оцените заказ?</Text>
          <Text style={styles.evaluationSubtitle}>
            Помогите нам улучшить сервис обслуживания!
          </Text>
          {evaluationQuestions && evaluationQuestions.length > 0
            ? evaluationQuestions.map(question => (
                <OrderEvaluationQuestion
                  question={question}
                  setEvaluationAnswers={setEvaluationAnswers}
                  key={question.id.toString()}
                />
              ))
            : null}
          <View style={styles.commentContainer}>
            <Text style={styles.commentLabel}>Ваш комментарий</Text>
            <FloatingLabelInput
              value={comment}
              onChangeText={e => setComment(e)}
              label=""
              staticLabel
              hint="Опишите подробнее вашу оценку..."
              hintTextColor="#929393"
              multiline
              inputStyles={styles.commentInput}
              containerStyles={appStyles.inputContainer}
            />
          </View>
          <View style={styles.evaluationButtonContainer}>
            <AppButton title="Отправить" onPress={evaluate} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  } else {
    modalContent = <OrderEvaluationSuccess modalRef={modalRef} />;
  }

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        onClosed={closeModal}
        onBackButtonPress={handleBackButtonPress}
        onOverlayPress={closeModal}
        handleStyle={{display: 'none'}}
        modalHeight={height * 0.93}
        rootStyle={appStyles.modalWindow}>
        <View style={styles.container}>
          <View style={appStyles.modalTopLine} />
          {modalContent}
        </View>
      </Modalize>
    </Portal>
  );
};

export default OrderEvaluationModal;
