import {createAsyncThunk} from '@reduxjs/toolkit';

import {IPage, Settings} from 'types/main/mainTypes';
import {
  UpdateNotificationsPayload,
  SendStatisticsPayload,
  SendStatisticsLogsPayload,
} from 'store/slices/mainSlice/types';

import AnalyticsService from 'services/AnalyticsService';

import ax from 'utils/ax';
import handleError from 'utils/handleError';

export const getSettings = createAsyncThunk<Settings>(
  'main/getSettings',
  async () => {
    const response = await ax().post('api/settings');
    if (handleError(response)) {
      return response.data.data;
    }
  },
);

export const getPage = createAsyncThunk(
  'main/getPage',
  async (page: IPage, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    const response = await ax().post('api/page', {page});
    if (handleError(response)) {
      if (user) {
        const params = {
          userId: user.id,
          page,
        };
        AnalyticsService.trackEvent('get_page', params);
      } else {
        AnalyticsService.trackEvent('get_page', {page});
      }
      return response.data.data;
    }
  },
);

export const updateNotifications = createAsyncThunk(
  'main/updateNotifications',
  async (payload: UpdateNotificationsPayload, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    const response = await ax().post('api/user/notifications-update', payload);
    if (handleError(response)) {
      if (user) {
        const params = {
          userId: user.id,
        };
        AnalyticsService.trackEvent('update_notifications', params);
      } else {
        AnalyticsService.trackEvent('update_notifications');
      }
    }
  },
);

export const sendStatistics = createAsyncThunk(
  'main/sendStatistics',
  async (payload: SendStatisticsPayload) => {
    const response = await ax().post(
      'api/statistics/add-user-actions',
      payload,
    );
    return handleError(response);
  },
);

export const sendStatisticsLogs = createAsyncThunk(
  'main/sendStatisticsLogs',
  async (payload: SendStatisticsLogsPayload) => {
    const response = await ax().post('api/statistics/add-logs', payload);
    return handleError(response);
  },
);
