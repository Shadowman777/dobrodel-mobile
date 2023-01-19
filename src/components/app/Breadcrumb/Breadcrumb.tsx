import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

interface IBreadcrumbProps {
  title: string;
  onPress: () => void;
  rightIcon?: boolean;
  search?: boolean;
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({
  title,
  onPress,
  rightIcon = false,
  search = false,
}) => {
  const formattedTitle = (): string => {
    if (search && title.length > 15) {
      return `${title.slice(0, 15)}...`;
    }
    return title;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.breadcrumbBlock,
        appStyles.alignCenterRow,
        {maxWidth: search ? 200 : undefined},
      ]}>
      <Text numberOfLines={1} style={styles.breadcrumbText}>
        {formattedTitle()}
      </Text>
      {rightIcon && (
        <Ionicons
          name="ios-chevron-forward-outline"
          size={18}
          color="#323232"
        />
      )}
    </TouchableOpacity>
  );
};

export default Breadcrumb;
