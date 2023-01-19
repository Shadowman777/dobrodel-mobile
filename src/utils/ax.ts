import Config from 'react-native-config';

import axios, {AxiosInstance} from 'axios';
import DropdownAlertService from 'services/DropdownAlertService';

const ax = (): AxiosInstance => {
  const axInstance = axios.create({
    baseURL: Config.API_URL,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.message && error.message === 'Network Error') {
        DropdownAlertService.alert('error', 'Нет соединения с интернетом');
      } else {
        const errorStatus = error.response.status;
        if (errorStatus === 500 || errorStatus === 400) {
          DropdownAlertService.alert(
            'error',
            'Сервис временно недоступен, повторите попытку позже',
          );
        } else if (errorStatus === 422) {
          DropdownAlertService.alert('error', 'Ошибка отправки данных');
        }
      }
      return Promise.reject(error);
    },
  );

  return axInstance;
};

export default ax;
