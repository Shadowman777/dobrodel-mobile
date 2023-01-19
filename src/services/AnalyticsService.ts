import {Platform} from 'react-native';
import {Config} from 'react-native-config';
import analytics from '@react-native-firebase/analytics';
import {YandexMetrica} from 'react-native-appmetrica-yandex';
import {Amplitude} from '@amplitude/react-native';
import {Settings, AppEventsLogger} from 'react-native-fbsdk-next';
import AppsFlyer from 'react-native-appsflyer';

import {
  SendStatisticsLogsPayload,
  EventLog,
} from 'store/slices/mainSlice/types';
import {store} from 'store/configureStore';
import {
  sendStatistics,
  sendStatisticsLogs,
} from 'store/slices/mainSlice/mainThunks';
import {setFirstLaunch} from 'store/slices/mainSlice/mainSlice';

import DateService from 'services/DateService';

import {APP_VERSION} from 'assets/styles/constants';

export default class AnalyticsService {
  static async registerAnalytics(): Promise<void> {
    const appMetricaKey =
      Platform.OS === 'ios'
        ? Config.APPMETRICA_IOS_API_KEY
        : Config.APPMETRICA_ANDROID_API_KEY;
    const amplitudeKey =
      Platform.OS === 'ios'
        ? Config.AMPLITUDE_IOS_API_KEY
        : Config.AMPLITUDE_ANDROID_API_KEY;
    const appsFlyerKey =
      Platform.OS === 'ios'
        ? Config.APPSFLYER_IOS_API_KEY
        : Config.APPSFLYER_ANDROID_API_KEY;
    const appsFlyerAppId =
      Platform.OS === 'ios' ? 'id1578165896' : 'com.o2oretail.dobrodelstore';

    try {
      await analytics().setAnalyticsCollectionEnabled(true);
      await YandexMetrica.activateWithApiKey(appMetricaKey);
      await Amplitude.getInstance().init(amplitudeKey);
      await AppsFlyer.initSdk({
        devKey: appsFlyerKey,
        isDebug: false,
        appId: appsFlyerAppId,
      });
      if (Platform.OS === 'android') {
        Settings.setAppID('692593941670256');
        Settings.initializeSDK();
      }

      const {firstLaunch} = store.getState().main;
      if (firstLaunch) {
        await this.trackEvent('first_app_open');
        store.dispatch<any>(setFirstLaunch(false));
      } else {
        const {user} = store.getState().auth;
        if (user) {
          await this.trackEvent('app_reopen', {userId: user.id});
        } else {
          await this.trackEvent('app_reopen');
        }
      }
    } catch (error) {}
  }
  static async trackScreen(screenName: string, userId?: number): Promise<void> {
    const initToken = store.getState().auth.initToken;

    try {
      await analytics().logEvent('route_change', {
        screen: screenName,
      });
      if (userId) {
        await YandexMetrica.reportEvent('route_change', {
          screen: screenName,
          user_id: userId,
        });
        await Amplitude.getInstance().logEvent('route_change', {
          screen: screenName,
          user_id: userId,
        });
        await AppsFlyer.logEvent('route_change', {
          screen: screenName,
          user_id: userId,
        });
        if (Platform.OS === 'android') {
          AppEventsLogger.logEvent('route_change', {
            screen: screenName,
            user_id: userId,
          });
        }
        initToken &&
          store.dispatch<any>(
            sendStatistics({
              action: 'route_change',
              app_version: APP_VERSION,
              params: {screen: screenName, user_id: userId},
            }),
          );
      } else {
        await YandexMetrica.reportEvent('route_change', {
          screen: screenName,
        });
        await Amplitude.getInstance().logEvent('route_change', {
          screen: screenName,
        });
        await AppsFlyer.logEvent('route_change', {
          screen: screenName,
        });
        if (Platform.OS === 'android') {
          AppEventsLogger.logEvent('route_change', {
            screen: screenName,
          });
        }
        initToken &&
          store.dispatch<any>(
            sendStatistics({
              action: 'route_change',
              app_version: APP_VERSION,
              params: {screen: screenName},
            }),
          );
      }
    } catch (error) {}
  }
  public static async trackEvent(
    event: string,
    params?: {[k: string]: string | number},
  ): Promise<void> {
    const {initToken} = store.getState().auth;
    const eventData: SendStatisticsLogsPayload = {
      event_logs: [],
    };
    const {year, month, day, hours, minutes, seconds} =
      DateService.getCurrentDate();
    const eventDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    if (params) {
      await this.execAnalyticsQuery<void>(
        analytics().logEvent(event, params),
        event,
        eventData,
        eventDate,
        'Google Analytics',
      );
      await this.execAnalyticsQuery<any>(
        YandexMetrica.reportEvent(event, params),
        event,
        eventData,
        eventDate,
        'App Metrica',
      );
      await this.execAnalyticsQuery<boolean>(
        Amplitude.getInstance().logEvent(event, params),
        event,
        eventData,
        eventDate,
        'Amplitude',
      );
      await this.execAnalyticsQuery<string>(
        AppsFlyer.logEvent(event, params),
        event,
        eventData,
        eventDate,
        'AppsFlyer',
      );
      if (Platform.OS === 'android') {
        AppEventsLogger.logEvent(event, params);
      }
      initToken &&
        store.dispatch<any>(
          sendStatistics({action: event, app_version: APP_VERSION, params}),
        );
    } else {
      await this.execAnalyticsQuery<void>(
        analytics().logEvent(event),
        event,
        eventData,
        eventDate,
        'Google Analytics',
      );
      await this.execAnalyticsQuery<any>(
        YandexMetrica.reportEvent(event),
        event,
        eventData,
        eventDate,
        'App Metrica',
      );
      await this.execAnalyticsQuery<boolean>(
        Amplitude.getInstance().logEvent(event),
        event,
        eventData,
        eventDate,
        'Amplitude',
      );
      await this.execAnalyticsQuery<string>(
        AppsFlyer.logEvent(event, {}),
        event,
        eventData,
        eventDate,
        'AppsFlyer',
      );
      if (Platform.OS === 'android') {
        AppEventsLogger.logEvent(event);
      }
      initToken &&
        store.dispatch<any>(
          sendStatistics({action: event, app_version: APP_VERSION}),
        );
    }
    initToken && store.dispatch<any>(sendStatisticsLogs(eventData));
  }

  private static async execAnalyticsQuery<T>(
    analyticsQuery: Promise<T>,
    eventName: string,
    eventData: SendStatisticsLogsPayload,
    eventDate: string,
    analyticsName: string,
  ): Promise<void> {
    const eventLog: EventLog = {
      event_name: eventName,
      event_date: eventDate,
      analytics_name: analyticsName,
      event_result: '',
    };

    try {
      await analyticsQuery;
      eventLog.event_result = 'success';
    } catch (e) {
      if (e.message) {
        eventLog.event_result = e.message;
      }
    }

    eventData.event_logs.push(eventLog);
  }
}
