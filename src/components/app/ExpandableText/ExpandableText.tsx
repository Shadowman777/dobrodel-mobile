import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  NativeSyntheticEvent,
  TextLayoutEventData,
  TextLayoutLine,
  Platform,
} from 'react-native';

import AndroidTextTouchable from './components/AndroidTextTouchable/AndroidTextTouchable';
import IosTextTouchable from './components/IosTextTouchable/IosTextTouchable';

interface ExpandableTextProps {
  text: string;
  numberOfLines?: number;
  shortText: string;
  setShortText: Dispatch<SetStateAction<string>>;
  action?: boolean;
  marginVertical?: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  numberOfLines = 3,
  shortText,
  setShortText,
  action = false,
  marginVertical = 16,
}) => {
  const [isFullDescription, setFullDescription] = useState<boolean>(false);
  const [symbolsCount, setSymbolsCount] = useState<number>(120);

  const isCollapsedIosText = useMemo(
    () => text.length > 160 && !isFullDescription,
    [text, isFullDescription],
  );

  const showFullDescription = useCallback((): void => {
    setFullDescription(true);
    setShortText('');
  }, []);

  const getIosText = useCallback((): string => {
    if (isCollapsedIosText && !action) {
      return text.slice(0, symbolsCount).concat('...');
    } else if (isCollapsedIosText && action) {
      return text.slice(0, symbolsCount);
    }

    return text;
  }, [text, isCollapsedIosText, symbolsCount, action]);

  const checkLines = useCallback(
    (lines: TextLayoutLine[]): boolean => {
      if (Platform.OS === 'android') {
        return lines.length > numberOfLines;
      } else {
        return lines.length >= numberOfLines;
      }
    },
    [numberOfLines],
  );

  const handleTextLayout = useCallback(
    ({
      nativeEvent: {lines},
    }: NativeSyntheticEvent<TextLayoutEventData>): void => {
      if (checkLines(lines)) {
        setShortText(
          lines
            .slice(0, numberOfLines)
            .map(line => line.text)
            .join('')
            .slice(0, -6)
            .concat('...'),
        );
      }
    },
    [numberOfLines],
  );

  useEffect(() => {
    setSymbolsCount(action ? 160 : 120);
  }, [action]);

  const textTouchable = Platform.select({
    android: (
      <AndroidTextTouchable
        shortText={shortText}
        action={action}
        showFullDescription={showFullDescription}
        isFullDescription={isFullDescription}
        setFullDescription={setFullDescription}
        numberOfLines={numberOfLines}
        text={text}
        handleTextLayout={handleTextLayout}
        marginVertical={marginVertical}
      />
    ),
    ios: (
      <IosTextTouchable
        action={action}
        showFullDescription={showFullDescription}
        isFullDescription={isFullDescription}
        setFullDescription={setFullDescription}
        getIosText={getIosText}
        isCollapsedIosText={isCollapsedIosText}
        marginVertical={marginVertical}
      />
    ),
  });

  return <>{textTouchable}</>;
};

export default ExpandableText;
