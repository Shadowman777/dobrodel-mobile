import React from 'react';
import {View, Text, ScrollView, StatusBar} from 'react-native';
import AppButton from 'components/app/AppButton/AppButton';

import LinkingService from 'services/LinkingService';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const FeedbackScreen = () => {
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={[appStyles.grow, appStyles.appContentBlock]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={{marginTop: 5}}>
        <Text style={appStyles.appTitle}>Служба поддержки</Text>
      </View>
      <View style={{marginVertical: 5}}>
        <Text style={styles.feedbackSubtitle}>Самый быстрый способ</Text>
        <View style={styles.telegramButton}>
          <AppButton
            title="Написать в Telegram"
            onPress={() =>
              LinkingService.goToUrl('https://t.me/dobrodel_support_bot')
            }
            buttonShadow
          />
        </View>
        <Text style={styles.contactsSubtitle}>
          Среднее время ожидания ответа - 1 час
        </Text>
      </View>
      <View style={styles.contactsContainer}>
        <View>
          <Text style={styles.contactsTitle}>Время работы</Text>
          <Text style={styles.contactsSubtitle}>
            Ежедневно с 07:00 до 22:00
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default FeedbackScreen;
