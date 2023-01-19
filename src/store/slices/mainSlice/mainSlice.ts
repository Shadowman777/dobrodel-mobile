import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from 'store/rootStorage';
import {Settings} from 'types/main/mainTypes';
import {getPage, getSettings} from 'store/slices/mainSlice/mainThunks';

interface IMainState {
  firstLaunch: boolean;
  isViewedOnboarding: boolean;
  isVisibleNewYearBanner: boolean;
  loading: boolean;
  page: string;
  settings: Settings | null;
}

const initialState: IMainState = {
  firstLaunch: true,
  isViewedOnboarding: false,
  isVisibleNewYearBanner: true,
  loading: false,
  page: '',
  settings: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setFirstLaunch(state, action: PayloadAction<boolean>) {
      state.firstLaunch = action.payload;
    },
    setViewedOnboarding(state, action: PayloadAction<boolean>) {
      state.isViewedOnboarding = action.payload;
    },
    setVisibleNewYearBanner(state, action: PayloadAction<boolean>) {
      state.isVisibleNewYearBanner = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
    });
    builder.addCase(getPage.pending, state => {
      state.loading = true;
    });
    builder.addCase(getPage.fulfilled, (state, action) => {
      state.loading = false;
      state.page = action.payload;
    });
    builder.addCase(getPage.rejected, state => {
      state.loading = false;
    });
  },
});

export const {
  setLoading,
  setViewedOnboarding,
  setVisibleNewYearBanner,
  setFirstLaunch,
} = mainSlice.actions;

export const firstLaunch = (state: RootState) => state.main.firstLaunch;
export const isViewedOnboarding = (state: RootState) =>
  state.main.isViewedOnboarding;
export const isVisibleNewYearBanner = (state: RootState) =>
  state.main.isVisibleNewYearBanner;
export const loading = (state: RootState) => state.main.loading;
export const settings = (state: RootState) => state.main.settings;
export const page = (state: RootState) => state.main.page;

export const mainReducer = mainSlice.reducer;
