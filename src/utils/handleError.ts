import DropdownAlertService from 'services/DropdownAlertService';
import {AxiosResponse} from 'axios';

const handleError = (
  response: AxiosResponse,
  promoCode?: boolean,
): boolean | string => {
  let errorMsg = '';

  if (response.data.code === 'error') {
    if ('data' in response.data) {
      errorMsg = response.data.data;
    } else if ('message' in response.data) {
      errorMsg = response.data.message;
    }
    !promoCode && DropdownAlertService.alert('error', errorMsg);

    return promoCode ? errorMsg : false;
  }

  return true;
};

export default handleError;
