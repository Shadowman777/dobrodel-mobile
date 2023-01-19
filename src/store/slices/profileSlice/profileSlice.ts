import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from 'store/rootStorage';
import {Order, IInviteData} from 'types/profile/profileTypes';
import {GetRouteResponse, OrdersEvaluationQuestions} from './types';

import profileBuilders from './profileBuilders';

export interface IProfileState {
  isOrderStarted: boolean;
  isAgreeWithTerms: boolean;
  isDeliveryOrders: boolean;
  isPayOrders: boolean;
  payOrdersInfo: string;
  inviteData: IInviteData | null;
  orders: Order[];
  order: Order | null;
  lastOrderId: string;
  evaluationQuestions: OrdersEvaluationQuestions[];
  evaluationFinished: boolean;
  routeGeometry: GetRouteResponse | null;
  paymentUrl: string;
  loading: boolean;
}

const initialState: IProfileState = {
  isOrderStarted: false,
  isAgreeWithTerms: false,
  isDeliveryOrders: false,
  isPayOrders: false,
  payOrdersInfo: '',
  orders: [],
  order: null,
  lastOrderId: '',
  evaluationQuestions: [],
  evaluationFinished: false,
  routeGeometry: null,
  paymentUrl: '',
  loading: false,
  inviteData: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAgreeWithTerms(state, action: PayloadAction<boolean>) {
      state.isAgreeWithTerms = action.payload;
    },
    setOrderStarted(state, action: PayloadAction<boolean>) {
      state.isOrderStarted = action.payload;
    },
    setEvaluationFinished(state, action: PayloadAction<boolean>) {
      state.evaluationFinished = action.payload;
    },
    setLastOrderId(state, action: PayloadAction<string>) {
      state.lastOrderId = action.payload;
    },
    setPaymentUrl(state, action: PayloadAction<string>) {
      state.paymentUrl = action.payload;
    },
    setRouteGeometry(state, action: PayloadAction<GetRouteResponse | null>) {
      state.routeGeometry = action.payload;
    },
    clearOrders(state) {
      state.orders = [];
      state.order = null;
    },
  },
  extraReducers: builder => profileBuilders(builder),
});

export const {
  setAgreeWithTerms,
  setOrderStarted,
  setEvaluationFinished,
  setPaymentUrl,
  setLastOrderId,
  setRouteGeometry,
  clearOrders,
} = profileSlice.actions;

export const isOrderStarted = (state: RootState) =>
  state.profile.isOrderStarted;
export const evaluationFinished = (state: RootState) =>
  state.profile.evaluationFinished;
export const isAgreeWithTerms = (state: RootState) =>
  state.profile.isAgreeWithTerms;
export const isDeliveryOrders = (state: RootState) =>
  state.profile.isDeliveryOrders;
export const isPayOrders = (state: RootState) => state.profile.isPayOrders;
export const payOrdersInfo = (state: RootState) => state.profile.payOrdersInfo;
export const orders = (state: RootState) => state.profile.orders;
export const order = (state: RootState) => state.profile.order;
export const inviteData = (state: RootState) => state.profile.inviteData;
export const lastOrderId = (state: RootState) => state.profile.lastOrderId;
export const evaluationQuestions = (state: RootState) =>
  state.profile.evaluationQuestions;
export const routeGeometry = (state: RootState) => state.profile.routeGeometry;
export const paymentUrl = (state: RootState) => state.profile.paymentUrl;

export const profileReducer = profileSlice.reducer;
