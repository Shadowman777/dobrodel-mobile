import {Dispatch, SetStateAction} from 'react';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {User, ISendSmsPayload, IEditUserPayload} from 'types/auth/authTypes';
import {setButtonLoading} from 'store/slices/loadingSlice/loadingSlice';

import AnalyticsService from 'services/AnalyticsService';

import ax from 'utils/ax';
import handleError from 'utils/handleError';
import DropdownAlertService from 'services/DropdownAlertService';
import {referrer} from "store/slices/authSlice/authSlice";

export const getInitToken = createAsyncThunk(
  'auth/getInitToken',
  async (payload: {[k: string]: string}) => {
    const response = await ax().post('api/init', payload);
    if (handleError(response)) {
      return response.data.data.application_token;
    }
  },
);

export const getSmsForAuth = createAsyncThunk(
  'auth/getSmsForAuth',
  async (payload: {
    phone: string;
    referrer: string;
    setPhone?: Dispatch<SetStateAction<string>>;
    setIntervalStarted?: Dispatch<SetStateAction<boolean>>;
  }) => {
    const apiPayload = {
      phone: payload.phone,
      ...(payload.referrer.length > 0 ? {referrer: payload.referrer} : {}),
    };

    const response = await ax().post('api/auth/step1', apiPayload);

    payload.setIntervalStarted && payload.setIntervalStarted(true);

    if (handleError(response)) {
      AnalyticsService.trackEvent('get_sms').then();

      payload.setPhone && payload.setPhone(payload.phone);

      if (response.data.is_registration) {
        AnalyticsService.trackEvent('app_registration').then();
      } else {
        AnalyticsService.trackEvent('app_authorization').then();
      }
    }
  },
);

export const sendAuthSmsCode = createAsyncThunk(
  'auth/sendAuthSmsCode',
  async (payload: ISendSmsPayload, thunkAPI) => {
    payload.setInputBlocked(true);

    const state = thunkAPI.getState() as any;
    const {settings} = state.main;

    const apiPayload = {
      phone: payload.phone,
      sms_code: payload.sms_code,
      device_name: payload.device_name,
    };

    const response = await ax().post('api/auth/step2', apiPayload);
    if (handleError(response)) {
      if (response.data.data.show_telegram_popup) {
        payload.setTelegramModalVisible(true);
      }

      return response.data.data;
    } else {
      payload.formikHelpers.current.resetForm();
      payload.setSmsCode.flush();

      if (payload.setFieldError) {
        payload.setFieldError('sms_code', 'Код неверный, проверьте цифры');
        AnalyticsService.trackEvent('sms_error', {
          error: 'Код неверный, проверьте цифры',
        }).then();
        AnalyticsService.trackEvent('sms_repeat_send').then();
      }

      if (settings && settings.resending_sms) {
        payload.setIntervalTime(settings.resending_sms);
      }
      payload.setIntervalStarted && payload.setIntervalStarted(true);
    }
  },
);

export const getUser = createAsyncThunk<User>('auth/getUser', async () => {
  const response = await ax().post('api/user/data');
  if (handleError(response)) {
    return response.data.data;
  }
});

export const editUser = createAsyncThunk(
  'auth/editUser',
  async (payload: IEditUserPayload, thunkAPI) => {
    const response = await ax().post('api/user/save-profile', payload);
    if (handleError(response)) {
      DropdownAlertService.alert('success', 'Профиль успешно изменён');
      await thunkAPI.dispatch(getUser());
      AnalyticsService.trackEvent('edit_profile').then();
    }
  },
);

// TODO перенести в mainThunks
export const getUserNotifications = createAsyncThunk(
  'user/getUserNotifications',
  async () => {
    const response = await ax().post('api/user/notifications-get');
    if (handleError(response)) {
      return response.data;
    }
  },
);

export const linkTelegram = createAsyncThunk<string>(
  'auth/linkTelegram',
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setButtonLoading(true));

      const response = await ax().post('api/user/get-telegram-bot');

      thunkAPI.dispatch(setButtonLoading(false));

      if (handleError(response)) {
        return response.data.data;
      }
    } catch (e) {
      thunkAPI.dispatch(setButtonLoading(false));
    }
  },
);

export const unlinkTelegram = createAsyncThunk(
  'auth/unlinkTelegram',
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setButtonLoading(true));

      const response = await ax().post('api/user/get-telegram-bot-unlink');

      thunkAPI.dispatch(setButtonLoading(false));

      return handleError(response) as boolean;
    } catch (e) {
      thunkAPI.dispatch(setButtonLoading(false));
    }
  },
);
