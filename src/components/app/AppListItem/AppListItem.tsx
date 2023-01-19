import React from 'react';
import {View, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import FeatherIcons from 'react-native-vector-icons/Feather';

import styles from './styles';
import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

interface IAppListItemProps {
  title: string;
  subtitle?: string;
  onPress?: any;
  bottomDivider?: boolean;
  leftIcon?: JSX.Element;
  chevron?: boolean;
  bold?: boolean;
}

const AppListItem: React.FC<IAppListItemProps> = ({
  title,
  subtitle,
  onPress,
  bottomDivider = true,
  leftIcon,
  chevron,
  bold = false,
}) => {
  const handlePress = onPress ? onPress : null;

  return (
    <ListItem
      onPress={handlePress}
      bottomDivider={bottomDivider}
      containerStyle={{paddingHorizontal: 0}}>
      {leftIcon && (
        <View style={{marginLeft: 15, marginRight: 3}}>{leftIcon}</View>
      )}
      <ListItem.Content>
        <ListItem.Title>
          <View style={appStyles.alignCenterRow}>
            <Text style={bold ? styles.listItemTextBold : styles.listItemText}>
              {title}
            </Text>
            {subtitle ? (
              <Text
                style={{
                  ...styles.listItemTextBold,
                  color: constants.colors.primary,
                  paddingLeft: 7,
                }}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </ListItem.Title>
      </ListItem.Content>
      {chevron && <FeatherIcons name="arrow-right" size={25} color="#323232" />}
    </ListItem>
  );
};

export default AppListItem;
