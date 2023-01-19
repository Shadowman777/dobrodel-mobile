import {createAsyncThunk} from '@reduxjs/toolkit';
import Config from 'react-native-config';
import turfBezier from '@turf/bezier-spline';

const polyline = require('@mapbox/polyline');
const turfHelpers = require('@turf/helpers');

import {
  StartOrderPayload,
  FinishOrderPayload,
  GetOrdersInfoPayload,
  EvaluateOrderPayload,
  OrdersEvaluationQuestions,
} from 'store/slices/profileSlice/types';
import {Order, IInviteData} from 'types/profile/profileTypes';
import {GetRouteResponse} from './types';

import AnalyticsService from 'services/AnalyticsService';

import {
  setMainLoading,
  setEvaluationLoading,
  setOrdersLoading,
} from 'store/slices/loadingSlice/loadingSlice';
import {setPromoCode} from 'store/slices/shopSlice/shopSlice';
import {getCart} from 'store/slices/shopSlice/shopThunks';

import ax from 'utils/ax';
import handleError from 'utils/handleError';
import DropdownAlertService from 'services/DropdownAlertService';

export const startOrder = createAsyncThunk(
  'profile/startOrder',
  async (payload: StartOrderPayload, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    const response = await ax().post('api/order/create/step1', payload);

    AnalyticsService.trackEvent('start_order', {userId: user.id});
    return handleError(response) as boolean;
  },
);

export const finishOrder = createAsyncThunk(
  'profile/finishOrder',
  async (payload: FinishOrderPayload, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    try {
      thunkAPI.dispatch(setMainLoading(true));

      const response = await ax().post('api/order/create/step2', payload);

      thunkAPI.dispatch(setMainLoading(false));

      if (handleError(response)) {
        thunkAPI.dispatch(getCart());
        thunkAPI.dispatch(setPromoCode(''));

        AnalyticsService.trackEvent('finish_order', {userId: user.id});

        return {
          payment_url: response.data.data.payment_url,
          order_id: response.data.data.order_id,
        };
      } else {
        AnalyticsService.trackEvent('finish_order_error', {
          error: response.data.data,
        });
      }
    } catch (e) {
      thunkAPI.dispatch(setMainLoading(false));
    }
  },
);

export const getOrderUrl = createAsyncThunk(
  'profile/getOrderUrl',
  async (id_order: number, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    const response = await ax().post('api/order/payment/get-url', {id_order});
    if (handleError(response)) {
      AnalyticsService.trackEvent('pay_order_again', {userId: user.id});
      return response.data.data.payment_url as string;
    }
  },
);

export const getOrders = createAsyncThunk<Order[]>(
  'profile/getOrders',
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setOrdersLoading(true));

      const response = await ax().post('api/order/get/all');

      thunkAPI.dispatch(setOrdersLoading(false));

      if (handleError(response)) {
        return response.data.data;
      }
    } catch (e) {
      thunkAPI.dispatch(setOrdersLoading(false));
    }
  },
);

export const getInviteCode = createAsyncThunk(
  'profile/getInviteCode',
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;
    try {
      thunkAPI.dispatch(setMainLoading(true));

      const response = await ax().post('api/user/invite/friend', {
        id_customer: user.id,
      });

      thunkAPI.dispatch(setMainLoading(false));
      if (handleError(response)) {
        return response.data.data as IInviteData;
      } else {
        return {
          invitePromoCode: '',
          inviteScreenText: '',
          inviteMessageText: '',
          error: response.data.message,
        } as IInviteData;
      }
    } catch (e) {
      thunkAPI.dispatch(setMainLoading(false));
      return {
        invitePromoCode: '',
        inviteScreenText: '',
        inviteMessageText: '',
        error: e.message,
      } as IInviteData;
    }
  },
);

export const getOrder = createAsyncThunk(
  'profile/getOrder',
  async (id_order: number, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    try {
      thunkAPI.dispatch(setMainLoading(true));

      const response = await ax().post('api/order/get/card', {id_order});

      thunkAPI.dispatch(setMainLoading(false));

      if (handleError(response)) {
        AnalyticsService.trackEvent('open_order', {userId: user.id});
        return response.data.data as Order;
      }
    } catch (e) {
      thunkAPI.dispatch(setMainLoading(false));
    }
  },
);

export const getOrdersInfo = createAsyncThunk(
  'profile/getOrdersInfo',
  async () => {
    const response = await ax().post('api/order/get/info');
    if (handleError(response)) {
      return response.data.data as GetOrdersInfoPayload;
    }
  },
);

export const getOrderEvaluationQuestions = createAsyncThunk(
  'profile/getOrderEvaluationQuestions',
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setEvaluationLoading(true));

      const response = await ax().post('api/order/evaluation/get');

      thunkAPI.dispatch(setEvaluationLoading(false));

      if (handleError(response)) {
        return response.data.data as OrdersEvaluationQuestions[];
      }
    } catch (e) {
      thunkAPI.dispatch(setEvaluationLoading(false));
    }
  },
);

export const evaluateOrder = createAsyncThunk(
  'profile/evaluateOrder',
  async (payload: EvaluateOrderPayload, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    try {
      thunkAPI.dispatch(setEvaluationLoading(true));

      const response = await ax().post('api/order/evaluation/add', payload);

      thunkAPI.dispatch(setEvaluationLoading(false));

      AnalyticsService.trackEvent('evaluate_order', {userId: user.id});
      return handleError(response) as boolean;
    } catch (e) {
      thunkAPI.dispatch(setEvaluationLoading(false));
    }
  },
);

export const cancelOrder = createAsyncThunk(
  'profile/cancelOrder',
  async (payload: {id_order: number}, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    const response = await ax().post('api/order/cancellation', {
      id_order: payload.id_order,
    });
    if (handleError(response)) {
      AnalyticsService.trackEvent('cancel_order', {userId: user.id});
      thunkAPI.dispatch(getOrder(payload.id_order));
    }
  },
);

export const getRoute = createAsyncThunk(
  'profile/getRoute',
  async (
    {
      coordinates,
      traffic = 'driving-traffic',
    }: {
      coordinates: string;
      traffic?: string;
    },
    thunkAPI,
  ) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    try {
      const response = await ax().get(
        `https://api.mapbox.com/directions/v5/mapbox/${traffic}/${coordinates}?access_token=${Config.MAPBOX_TOKEN}`,
      );

      const routeTrip = response.data.routes[0];
      const routeGeometry = polyline.toGeoJSON(routeTrip.geometry);
      const routeLine = turfHelpers.lineString(routeGeometry.coordinates);
      const smoothGeometry = turfBezier(routeLine, {sharpness: 0.4});

      AnalyticsService.trackEvent('get_order_route', {
        userId: user.id,
        trafficType: traffic,
      });

      return {
        geometry: smoothGeometry.geometry,
        duration: Math.round(routeTrip.duration / 60),
        distance: (routeTrip.distance / 1000).toFixed(1),
      } as GetRouteResponse;
    } catch (error) {
      if (error.response.status === 422) {
        DropdownAlertService.alert(
          'error',
          'Не удалось построить маршрут. Возможно, вы слишком далеко.',
        );
      }
    }
  },
);
