import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from 'store/rootStorage';

// TODO отрефакторить переменные загрузок
interface ILoadingState<T = boolean> {
  actionLoading: T;
  mainLoading: T;
  productLoading: T;
  ordersLoading: T;
  evaluationLoading: T;
  buttonLoading: T;
  deliveryPointLoading: T;
}

const initialState: ILoadingState = {
  actionLoading: false,
  mainLoading: false,
  productLoading: false,
  ordersLoading: false,
  evaluationLoading: false,
  buttonLoading: false,
  deliveryPointLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setActionLoading(state, action: PayloadAction<boolean>) {
      state.actionLoading = action.payload;
    },
    setMainLoading(state, action: PayloadAction<boolean>) {
      state.mainLoading = action.payload;
    },
    setProductLoading(state, action: PayloadAction<boolean>) {
      state.productLoading = action.payload;
    },
    setOrdersLoading(state, action: PayloadAction<boolean>) {
      state.ordersLoading = action.payload;
    },
    setEvaluationLoading(state, action: PayloadAction<boolean>) {
      state.evaluationLoading = action.payload;
    },
    setButtonLoading(state, action: PayloadAction<boolean>) {
      state.buttonLoading = action.payload;
    },
    setDeliveryPointLoading(state, action: PayloadAction<boolean>) {
      state.deliveryPointLoading = action.payload;
    },
  },
});

export const {
  setActionLoading,
  setMainLoading,
  setProductLoading,
  setOrdersLoading,
  setEvaluationLoading,
  setButtonLoading,
  setDeliveryPointLoading,
} = loadingSlice.actions;

export const actionLoading = (state: RootState) => state.loading.actionLoading;
export const mainLoading = (state: RootState) => state.loading.mainLoading;
export const productLoading = (state: RootState) =>
  state.loading.productLoading;
export const ordersLoading = (state: RootState) => state.loading.ordersLoading;
export const evaluationLoading = (state: RootState) =>
  state.loading.evaluationLoading;
export const buttonLoading = (state: RootState) => state.loading.buttonLoading;
export const deliveryPointLoading = (state: RootState) =>
  state.loading.deliveryPointLoading;

export const loadingReducer = loadingSlice.reducer;
