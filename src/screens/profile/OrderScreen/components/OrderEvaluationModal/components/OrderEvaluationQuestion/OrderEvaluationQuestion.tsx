import React, {Dispatch, SetStateAction} from 'react';
import {View, Text} from 'react-native';
import {AirbnbRating} from 'react-native-elements';

import {OrdersEvaluationQuestions} from 'store/slices/profileSlice/types';
import {EvaluationAnswer} from 'types/profile/profileTypes';

import styles from './styles';
import constants from 'assets/styles/constants';

const OrderEvaluationQuestion: React.FC<{
  question: OrdersEvaluationQuestions;
  setEvaluationAnswers: Dispatch<SetStateAction<EvaluationAnswer[]>>;
}> = ({question, setEvaluationAnswers}) => {
  const changeRating = (e: number): void => {
    setEvaluationAnswers(prevState =>
      prevState.map(answer =>
        answer.id_evaluation_questions === question.id
          ? {...answer, quantity: e}
          : answer,
      ),
    );
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionTitle}>
        {question.id}. {question.questions}
      </Text>
      <Text style={styles.questionSubtitle}>{question.description}</Text>
      <View style={styles.questionRatingContainer}>
        <AirbnbRating
          defaultRating={0}
          count={5}
          showRating={false}
          onFinishRating={e => changeRating(e)}
          unSelectedColor="#e9e9e9"
          selectedColor={constants.colors.primary}
          starStyle={{marginRight: 8}}
          size={28}
        />
      </View>
    </View>
  );
};

export default OrderEvaluationQuestion;
