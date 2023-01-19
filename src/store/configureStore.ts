import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

import {rootReducer} from './slices/rootSlices';
import axios from 'axios';

import {localStorage} from 'utils/localStorage';

const persistConfig = {
  key: 'dobrodel',
  storage: localStorage,
};

const rehydrationCallback = () => {
  const {initToken, authToken} = store.getState().auth;

  if (initToken) {
    axios.defaults.headers.common['Application-token'] = initToken;
  }
  if (authToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store, null, rehydrationCallback);
