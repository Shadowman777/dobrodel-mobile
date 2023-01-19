import {useEffect, useCallback, useRef} from 'react';
import {FlatList} from 'react-native';

import {IScrollToIndexInfo} from 'types/main/mainTypes';

const useScroll = (activeIndex: number) => {
  const flatListRef = useRef<FlatList>(null);

  const handleOnScrollToIndexFailed = useCallback(
    async (info: IScrollToIndexInfo) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: info.index,
        viewPosition: 0,
      });
    },
    [],
  );

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: activeIndex,
      viewPosition: 0,
    });
  }, [activeIndex]);

  return {
    flatListRef,
    handleOnScrollToIndexFailed,
  };
};

export default useScroll;
