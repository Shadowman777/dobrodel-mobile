import React, {Dispatch, SetStateAction} from 'react';
import {DebouncedState} from 'use-debounce/lib/useDebouncedCallback';

export interface User<T = string | null, P = boolean | null> {
  id: number;
  phone: string;
  first_name: T;
  last_name: T;
  email: T;
  status: number;
  notifications_order: P;
  notifications_news: P;
  notification?: {
    code: T;
    data: {
      description: T;
      expiration_date: T;
    };
  };
  telegram_linked?: boolean;
  show_telegram_popup?: boolean;
}

export interface ISendSmsPayload {
  phone: string;
  sms_code: string;
  device_name: string;
  cart: boolean;
  setFieldError?: (field: string, message?: string) => void;
  setIntervalStarted?: Dispatch<SetStateAction<boolean>>;
  setInputBlocked: Dispatch<SetStateAction<boolean>>;
  setIntervalTime: Dispatch<SetStateAction<number>>;
  setTelegramModalVisible: Dispatch<SetStateAction<boolean>>;
  setSmsCode: DebouncedState<(value: any) => void>;
  formikHelpers: React.MutableRefObject<any>;
}

export interface IEditUserPayload {
  first_name: string;
  last_name: string;
  email: string;
}
