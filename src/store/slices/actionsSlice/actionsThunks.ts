import {createAsyncThunk} from '@reduxjs/toolkit';

import {Action} from 'types/actions/actionsTypes';
import {Product} from 'types/shop/shopTypes';
import {ActionsPayload} from './types';

import {setProductId} from 'store/slices/shopSlice/shopSlice';
import {setActionId} from 'store/slices/actionsSlice/actionsSlice';
import {setActionLoading} from 'store/slices/loadingSlice/loadingSlice';

import ax from 'utils/ax';
import handleError from 'utils/handleError';

export const getActions = createAsyncThunk(
  'actions/getActions',
  async (payload: ActionsPayload) => {
    const response = await ax().post('api/news/get-all', payload);
    if (handleError(response)) {
      return response.data.data.news as Action[];
    }
  },
);

export const getActionWithProducts = createAsyncThunk(
  'actions/getActionWithProducts',
  async (id_news: number, thunkAPI) => {
    const productsResponse = await thunkAPI.dispatch(
      getActionProducts(id_news),
    );
    const productsPayload = productsResponse.payload;
    if (
      productsPayload &&
      Array.isArray(productsPayload) &&
      productsPayload.length === 1
    ) {
      thunkAPI.dispatch(setProductId(productsPayload[0].id));
    } else {
      thunkAPI.dispatch(setActionId(id_news));
    }
  },
);

export const getAction = createAsyncThunk(
  'actions/getAction',
  async (id_news: number, thunkAPI) => {
    try {
      thunkAPI.dispatch(setActionLoading(true));

      const response = await ax().post('api/news/get', {id_news});

      thunkAPI.dispatch(setActionLoading(false));
      if (handleError(response)) {
        return response.data.data as Action;
      }
    } catch (e) {
      thunkAPI.dispatch(setActionLoading(false));
    }
  },
);

export const getActionProducts = createAsyncThunk(
  'actions/getActionProducts',
  async (id_news: number) => {
    try {
      const response = await ax().post('api/news/get-items', {id_news});

      if (handleError(response)) {
        return response.data.data as Product[];
      }
    } catch (e) {}
  },
);
