import React, {Dispatch, SetStateAction} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from '../../styles';
import constants from 'assets/styles/constants';

interface IIosTextTouchableProps {
  action: boolean;
  showFullDescription: () => void;
  isFullDescription: boolean;
  setFullDescription: Dispatch<SetStateAction<boolean>>;
  getIosText: () => string;
  isCollapsedIosText: boolean;
  marginVertical: number;
}

const IosTextTouchable: React.FC<IIosTextTouchableProps> = props => {
  const {
    action,
    showFullDescription,
    isFullDescription,
    setFullDescription,
    getIosText,
    isCollapsedIosText,
    marginVertical,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={!isFullDescription && !action ? showFullDescription : undefined}
      style={{
        ...styles.wrapper,
        marginVertical,
        flexDirection: action ? 'column' : 'row',
      }}>
      <Text>
        <Text style={styles.text}>{getIosText()}</Text>
        {isCollapsedIosText && !action ? (
          <Ionicons
            name="ios-chevron-down-outline"
            size={19}
            color={constants.colors.primaryText}
          />
        ) : null}
      </Text>
      {isCollapsedIosText && action ? (
        <TouchableOpacity activeOpacity={0.9} onPress={showFullDescription}>
          <Text style={styles.expandText}>Развернуть...</Text>
        </TouchableOpacity>
      ) : null}
      {!isCollapsedIosText && action ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setFullDescription(false)}>
          <Text style={styles.expandText}>Свернуть...</Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default IosTextTouchable;
