import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from 'store/rootStorage';

import {Action} from 'types/actions/actionsTypes';
import {Product} from 'types/shop/shopTypes';
import actionsBuilders from 'store/slices/actionsSlice/actionsBuilders';

export interface IActionsState {
  actions: Action[];
  action: Action | null;
  actionProducts: Product[];
  actionId: number | null;
}

const initialState: IActionsState = {
  actions: [],
  action: null,
  actionProducts: [],
  actionId: null,
};

export const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    setActionId: (state, action: PayloadAction<number | null>) => {
      state.actionId = action.payload;
    },
    setAction: (state, action: PayloadAction<Action | null>) => {
      state.action = action.payload;
    },
  },
  extraReducers: builder => actionsBuilders(builder),
});

export const {setActionId, setAction} = actionsSlice.actions;

export const actions = (state: RootState) => state.actions.actions;
export const actionId = (state: RootState) => state.actions.actionId;
export const action = (state: RootState) => state.actions.action;
export const actionProducts = (state: RootState) =>
  state.actions.actionProducts;

export const actionsReducer = actionsSlice.reducer;
