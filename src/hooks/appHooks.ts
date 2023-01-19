import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from 'store/rootStorage';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
