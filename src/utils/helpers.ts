import distance from '@turf/distance';

import {IFormattedDate} from 'types/main/mainTypes';

const turfHelpers = require('@turf/helpers');

export const declOfNum = (
  num: number | null,
  words: string[],
): string | null => {
  if (num) {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? Math.abs(num) % 10 : 5]
    ];
  }
  return null;
};

export const getCoordinates = (coordinates: string): string[] => {
  return coordinates.split(/[\, ]/);
};

export const getDistanceBetweenPoints = (
  centerCoordinates: number[],
  pointCoordinates: number[],
): number => {
  const centerPoint = turfHelpers.point(centerCoordinates);
  const point = turfHelpers.point(
    pointCoordinates.map(currPoint => +currPoint),
  );

  return distance(centerPoint, point, {units: 'kilometers'});
};

export const padStart = (value: number): string => {
  return value < 10 ? `0${value}` : value.toString();
};

export const trimNewLines = (text: any) => {
  if (!text) {
    return;
  }
  return text.replace(/(\r\n|\n|\r)/gm, '');
};

export const formatDate = (date: string): IFormattedDate => {
  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const newDate = new Date(date.split(' ').join('T'));

  const day = padStart(newDate.getDate());
  const dayNumber = newDate.getDay();
  const month = padStart(newDate.getMonth() + 1);
  const hours = padStart(newDate.getHours());
  const minutes = padStart(newDate.getMinutes());

  return {
    formattedDate: `${day}.${month}`,
    day: weekDays[dayNumber],
    time: `${hours}:${minutes}`,
  };
};

export const formatOrderDate = (dateString: string): string => {
  const currentDate = new Date();
  const dateParam = dateString.split(/[\s-:]/);
  dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString();
  // @ts-ignore
  const date = new Date(...dateParam);
  const day = padStart(date.getDate());
  const month = padStart(date.getMonth() + 1);

  return date.toLocaleDateString() === currentDate.toLocaleDateString()
    ? 'Сегодня'
    : `${day}.${month}`;
};

export const getOrderDateTime = (dateString: string): string => {
  return dateString.split(' ')[1].slice(0, -3);
};

export const getTimePeriod = (dateStart: string, dateEnd: string): string => {
  return `${dateStart.split(' ')[1].slice(0, -3)} - ${dateEnd
    .split(' ')[1]
    .slice(0, -3)}`;
};

export const formatPhoneNumber = (phone: string) => {
  const formattedPhone = phone.replace('+', '');
  const matches = formattedPhone.match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/);

  return matches && matches.length > 0
    ? `+${matches[1]} (${matches[2]}) ${matches[3]}-${matches[4]}-${matches[5]}`
    : '';
};
