import React, {useMemo} from 'react';
import {View, Text} from 'react-native';

import CheckCircle from 'assets/icons/check-circle.svg';
import CloseCircle from 'assets/icons/close-circle.svg';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

interface OrderInfoMessageProps {
  type?: string;
  status_info: string | null;
  status_info_type: 'info' | 'error' | null;
}

const OrderInfoMessage: React.FC<OrderInfoMessageProps> = ({
  status_info,
  status_info_type,
}) => {
  const checkStatusInfoTypeError = useMemo((): boolean => {
    return status_info_type === 'error';
  }, [status_info_type]);

  if (status_info === null || status_info_type === null) {
    return null;
  }

  return (
    <View
      style={{
        ...styles.orderInfoMessageBlock,
        backgroundColor: checkStatusInfoTypeError ? '#fce9ec' : '#e7f7ed',
      }}>
      <View style={appStyles.alignCenterRow}>
        {checkStatusInfoTypeError ? <CloseCircle /> : <CheckCircle />}
        <Text
          style={{
            ...styles.orderInfoMessageText,
            color: checkStatusInfoTypeError ? '#e5243f' : '#0eb44d',
            width: '90%',
          }}>
          {status_info}
        </Text>
      </View>
    </View>
  );
};

export default OrderInfoMessage;
