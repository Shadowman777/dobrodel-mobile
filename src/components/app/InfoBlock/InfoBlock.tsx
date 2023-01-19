import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import appStyles from 'assets/styles/appStyles';

interface IInfoBlockProps {
  text: string;
  expirationDate: string;
}

const formatTimeUnit = (timeUnit: number | null) =>
  timeUnit && timeUnit < 10 ? `0${timeUnit}` : `${timeUnit}`;

const InfoBlock: React.FC<IInfoBlockProps> = ({text, expirationDate}) => {
  const formattedDate = expirationDate.replace(' ', 'T');
  const [timeLeft, setTimeLeft] = useState<{
    days: null | number;
    hours: null | number;
    minutes: null | number;
    seconds: null | number;
  }>({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });
  useEffect(() => {
    const difference = new Date(formattedDate).getTime() - new Date().getTime();
    let intervalId: undefined | ReturnType<typeof setInterval>;
    if (difference > 0) {
      intervalId = setInterval(() => {
        let days = Math.floor(difference / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(() => ({days, hours, minutes, seconds}));
      }, 1000);
    }

    return () => clearInterval(intervalId as ReturnType<typeof setInterval>);
  });

  if (!timeLeft.days && !timeLeft.hours && !timeLeft.minutes && !timeLeft.seconds) {
    return null;
  }

  return (
    <View style={[styles.infoBlock, appStyles.alignCenterRow]}>
      <Text style={styles.infoText}>{text}</Text>
      <Text style={[styles.infoText, styles.timerText]}>
        {`${timeLeft.days !== 0 ? `${formatTimeUnit(timeLeft.days)}:` : ''}`}
        {`${
          timeLeft.hours !== 0 ? `${formatTimeUnit(timeLeft.hours)}:` : '00:'
        }`}
        {`${
          timeLeft.minutes !== 0
            ? `${formatTimeUnit(timeLeft.minutes)}:`
            : '00:'
        }`}
        {`${
          timeLeft.seconds !== 0 ? `${formatTimeUnit(timeLeft.seconds)}` : '00'
        }`}
      </Text>
    </View>
  );
};

export default InfoBlock;
