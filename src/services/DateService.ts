import {toDate} from 'date-fns-tz';
import {padStart} from 'utils/helpers';

import {IDate} from 'types/main/mainTypes';

export default class DateService {
  static getCurrentDate(): IDate {
    const currentDate = toDate(new Date(), {timeZone: 'Europe/Moscow'});

    const year = currentDate.getFullYear().toString();
    const day = padStart(currentDate.getDate());
    const month = padStart(currentDate.getMonth() + 1);
    const hours = padStart(currentDate.getHours());
    const minutes = padStart(currentDate.getMinutes());
    const seconds = padStart(currentDate.getSeconds());

    return {
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
    };
  }
}
