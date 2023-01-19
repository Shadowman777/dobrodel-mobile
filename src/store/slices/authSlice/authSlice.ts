import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from 'store/rootStorage';
import {User} from 'types/auth/authTypes';

import axios from 'axios';
import extraAuthBuilders from 'store/slices/authSlice/authBuilders';
import {mmkvStorage} from 'utils/localStorage';

export interface IAuthState {
  user: User | null;
  initToken: string;
  authToken: string;
  isLogged: boolean;
  telegramLinked: boolean;
  telegramLink: string | null;
  telegramUnlink: boolean;
  referrer: string;
}

const initialState: IAuthState = {
  user: null,
  initToken: '',
  authToken: '',
  isLogged: false,
  telegramLinked: true,
  telegramLink: null,
  telegramUnlink: false,
  referrer: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTelegramLink(state, action: PayloadAction<string | null>) {
      state.telegramLink = action.payload;
    },
    setTelegramLinked(state, action: PayloadAction<boolean>) {
      state.telegramLinked = action.payload;
    },
    setLogged(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
    setReferrer(state, action: PayloadAction<string>) {
      state.referrer = action.payload;
    },
    logout(state) {
      state.user = null;
      state.authToken = '';
      state.telegramLink = null;
      state.isLogged = false;
      axios.defaults.headers.common.Authorization = '';
      mmkvStorage.delete('Authorization');
    },
  },
  extraReducers: extraAuthBuilders,
});

export const {setTelegramLink, setLogged, setReferrer, logout} =
  authSlice.actions;

export const user = (state: RootState) => state.auth.user;
export const isLogged = (state: RootState) => state.auth.isLogged;
export const referrer = (state: RootState) => state.auth.referrer;
export const showTelegramLinked = (state: RootState) =>
  state.auth.telegramLinked;

export const authReducer = authSlice.reducer;
