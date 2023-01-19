import React, {Dispatch, SetStateAction} from 'react';
import {
  TouchableOpacity,
  Text,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from '../../styles';
import constants from 'assets/styles/constants';

interface IAndroidTextTouchableProps {
  shortText: string;
  action: boolean;
  showFullDescription: () => void;
  isFullDescription: boolean;
  setFullDescription: Dispatch<SetStateAction<boolean>>;
  numberOfLines: number;
  text: string;
  handleTextLayout: ({
    nativeEvent: {lines},
  }: NativeSyntheticEvent<TextLayoutEventData>) => void;
  marginVertical: number;
}

const AndroidTextTouchable: React.FC<IAndroidTextTouchableProps> = props => {
  const {
    shortText,
    action,
    showFullDescription,
    isFullDescription,
    numberOfLines,
    text,
    handleTextLayout,
    setFullDescription,
    marginVertical,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={shortText !== '' && !action ? showFullDescription : undefined}
      style={{
        ...styles.wrapper,
        marginVertical,
        flexDirection: action ? 'column' : 'row',
      }}>
      <Text
        numberOfLines={!isFullDescription ? numberOfLines : undefined}
        onTextLayout={!isFullDescription ? handleTextLayout : undefined}>
        <Text style={styles.text}>{shortText ? shortText : text}</Text>
        {shortText !== '' && !action ? (
          <Ionicons
            name="ios-chevron-down-outline"
            size={19}
            color={constants.colors.primaryText}
          />
        ) : null}
      </Text>
      {shortText !== '' && !action ? (
        <TouchableOpacity activeOpacity={0.9} onPress={showFullDescription}>
          <Text style={styles.expandText}>Развернуть...</Text>
        </TouchableOpacity>
      ) : null}
      {shortText === '' && action ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setFullDescription(false)}>
          <Text style={styles.expandText}>Свернуть...</Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

export default AndroidTextTouchable;
