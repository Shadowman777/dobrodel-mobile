import {createAsyncThunk} from '@reduxjs/toolkit';
import {Dispatch} from 'redux';

import {AppDeliveryZone} from 'types/shop/shopTypes';

import {
  Cart,
  DeliveryPointExtended,
  Category,
  MainCategory,
  SubCategory,
  ProductDetailed,
  DeliveryZone,
  PopularCategory,
  ActiveZone,
} from 'types/shop/shopTypes';
import {
  setPromoCodeError,
  setUserCoordinates,
} from 'store/slices/shopSlice/shopSlice';
import {
  setMainLoading,
  setProductLoading,
  setButtonLoading,
  setDeliveryPointLoading,
} from 'store/slices/loadingSlice/loadingSlice';

import {
  AddToCartProduct,
  MultiAddToCartPayload,
  CategoryProductsPayload,
  AnotherProductsPayload,
  SearchProductsPayload,
  SearchProductsResponse,
  SearchDeliveryZonesPayload,
  GetCategoriesPayload,
} from './types';

import ax from 'utils/ax';
import handleError from 'utils/handleError';

import AnalyticsService from 'services/AnalyticsService';
import DropdownAlertService from 'services/DropdownAlertService';

export const getCategories = createAsyncThunk(
  'shop/getCategories',
  async (payload: GetCategoriesPayload, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    try {
      thunkAPI.dispatch(setMainLoading(true));

      const apiPayload = {
        category_id: payload.categoryId,
        is_all: payload.is_all,
      };

      const response = await ax().post('api/main', apiPayload);

      thunkAPI.dispatch(setMainLoading(false));
      if (handleError(response)) {
        if (user) {
          let params = {};
          if (payload.categoryName) {
            params = {
              userId: user.id,
              categoryName: payload.categoryName,
            };
          } else {
            params = {
              userId: user.id,
            };
          }
          AnalyticsService.trackEvent('get_category', params);
        } else {
          if (payload.categoryName) {
            AnalyticsService.trackEvent('get_category', {
              categoryName: payload.categoryName,
            });
          } else {
            AnalyticsService.trackEvent('get_category');
          }
        }
        return response.data.data as MainCategory[];
      }
    } catch (e) {
      thunkAPI.dispatch(setMainLoading(false));
    }
  },
);

export const getMainCategories = createAsyncThunk(
  'shop/getMainCategories',
  async (payload: {category_id: number}, thunkAPI) => {
    try {
      thunkAPI.dispatch(setMainLoading(true));

      const response = await ax().post('api/main', payload);

      thunkAPI.dispatch(setMainLoading(false));
      if (handleError(response)) {
        return response.data.data as MainCategory[];
      }
    } catch (e) {
      thunkAPI.dispatch(setMainLoading(false));
    }
  },
);

export const getCatalogCategories = createAsyncThunk(
  'shop/getCatalogCategories',
  async (arg, thunkAPI) => {
    try {
      thunkAPI.dispatch(setMainLoading(true));

      const response = await ax().post('api/category', {category_id: 0});

      if (handleError(response)) {
        thunkAPI.dispatch(setMainLoading(false));
        return response.data.data as SubCategory[];
      }
    } catch (e) {
      thunkAPI.dispatch(setMainLoading(false));
    }
  },
);

export const getSubCategories = createAsyncThunk(
  'shop/getSubCategories',
  async (category_id: number, thunkAPI) => {
    const response = await ax().post('api/category', {category_id});
    if (handleError(response)) {
      await thunkAPI.dispatch(getCategories({categoryId: category_id}));
      return response.data.data as SubCategory[];
    } else {
      const payload = {
        category_id,
        offset: 0,
        limit: 10,
        sort: 'popular',
      };

      await thunkAPI.dispatch(getCategoryProducts(payload));
    }
  },
);

export const getCategoryProducts = createAsyncThunk(
  'shop/getCategoryProducts',
  async (payload: CategoryProductsPayload) => {
    const response = await ax().post('api/products', payload);
    if (handleError(response)) {
      return response.data.data as Category;
    }
  },
);

export const getPopularCategories = createAsyncThunk(
  'shop/getPopularCategories',
  async () => {
    const response = await ax().post('api/popular-category');
    if (handleError(response)) {
      return response.data.data.categories as PopularCategory[];
    }
  },
);

export const getPopularProducts = createAsyncThunk(
  'shop/getPopularProducts',
  async () => {
    const response = await ax().post('api/products/popular-get');

    if (handleError(response)) {
      return response.data.data as ProductDetailed[];
    }
  },
);

export const getTopProducts = createAsyncThunk(
  'shop/getTopProducts',
  async () => {
    const response = await ax().post('api/products/top-get');

    if (handleError(response)) {
      return response.data.data as ProductDetailed[];
    }
  },
);

export const getRecentlyViewedProducts = createAsyncThunk(
  'shop/getRecentlyViewedProducts',
  async (payload: AnotherProductsPayload) => {
    const response = await ax().post('api/recently-viewed', payload);
    if (handleError(response)) {
      return response.data.data as Category;
    }
  },
);

export const getProduct = createAsyncThunk(
  'shop/getProduct',
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    try {
      thunkAPI.dispatch(setProductLoading(true));

      const response = await ax().post('api/card-product', {id});

      thunkAPI.dispatch(setProductLoading(false));

      if (handleError(response)) {
        thunkAPI.dispatch(getRecentlyViewedProducts({offset: 0, limit: 10}));

        const product: ProductDetailed = response.data.data;
        if (user) {
          const params = {
            userId: user.id,
            productName: product.name,
          };
          AnalyticsService.trackEvent('get_product', params);
        } else {
          AnalyticsService.trackEvent('get_product', {
            productName: product.name,
          });
        }
        return response.data.data as ProductDetailed;
      }
    } catch (e) {
      thunkAPI.dispatch(setProductLoading(false));
    }
  },
);

export const getCart = createAsyncThunk(
  'shop/getCart',
  async (promo_code?: string) => {
    const response = await ax().post(
      'api/basket/get-all',
      promo_code ? {promo_code} : {},
    );
    if (handleError(response)) {
      return response.data.data as Cart;
    }
  },
);

export const addToCart = createAsyncThunk(
  'shop/addToCart',
  async (payload: AddToCartProduct, thunkAPI) => {
    const response = await ax().post('api/basket/add', payload);
    if (handleError(response)) {
      await thunkAPI.dispatch(getCart());
    }
  },
);

export const multiAddToCart = createAsyncThunk(
  'shop/multiAddToCart',
  async (payload: MultiAddToCartPayload, thunkAPI) => {
    try {
      thunkAPI.dispatch(setButtonLoading(true));

      const response = await ax().post('api/basket/multi-add', payload);

      thunkAPI.dispatch(setButtonLoading(false));

      if (handleError(response)) {
        await thunkAPI.dispatch(getCart());
        DropdownAlertService.alert('success', 'Товары добавлены в корзину!');
      }
    } catch (e) {
      thunkAPI.dispatch(setButtonLoading(false));
    }
  },
);

export const clearCart = createAsyncThunk(
  'shop/clearCart',
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    const response = await ax().post('api/basket/clear');
    if (handleError(response)) {
      if (user) {
        const params = {
          userId: user.id,
        };
        AnalyticsService.trackEvent('clear_cart', params);
      } else {
        AnalyticsService.trackEvent('clear_cart');
      }
      await thunkAPI.dispatch(getCart());
    }
  },
);

export const getDeliveryPoints = createAsyncThunk<{
  [k: string]: DeliveryPointExtended;
}>('shop/getDeliveryPoints', async () => {
  const response = await ax().post('api/delivery-points');
  if (handleError(response)) {
    return response.data.data;
  }
});

export const getDeliveryPointInfo = createAsyncThunk(
  'shop/getDeliveryPointInfo',
  async (id_delivery_point: number, thunkAPI) => {
    try {
      thunkAPI.dispatch(setDeliveryPointLoading(true));

      const response = await ax().post('api/delivery-point-info', {
        id_delivery_point,
      });

      thunkAPI.dispatch(setDeliveryPointLoading(false));

      if (handleError(response)) {
        return response.data.data as DeliveryPointExtended;
      }
    } catch (e) {
      thunkAPI.dispatch(setDeliveryPointLoading(false));
    }
  },
);

export const searchDeliveryZones = createAsyncThunk(
  'shop/searchDeliveryZones',
  async (payload: SearchDeliveryZonesPayload, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    try {
      const response = await ax().post('api/geocode/search', payload);

      if (handleError(response)) {
        if (user) {
          const params = {
            userId: user.id,
            searchValue: payload.text,
          };
          AnalyticsService.trackEvent('search_zone', params);
        } else {
          AnalyticsService.trackEvent('search_zone', {
            searchValue: payload.text,
          });
        }
        return response.data.data.items as DeliveryZone[];
      } else {
        AnalyticsService.trackEvent('search_delivery_zone_error');
      }
    } catch (error) {
      handleError(error);
      AnalyticsService.trackEvent('search_delivery_zone_error');
    }
  },
);

export const getActiveZones = createAsyncThunk(
  'shop/getActiveZones',
  async () => {
    try {
      const response = await ax().post('api/geocode/active-areas');
      if (handleError(response)) {
        return response.data.data.cityData as ActiveZone[];
      }
    } catch (error) {
      handleError(error);
    }
  },
);

export const getUserAddress = createAsyncThunk(
  'shop/getUserAddress',
  async (
    payload: {
      userCoordinates: string;
      activeZones: ActiveZone[];
      dispatch: Dispatch<any>;
      changeDeliveryZone?: (
        zone: DeliveryZone | null,
        coordinates?: string,
        address?: string,
      ) => void;
    },
    thunkAPI,
  ) => {
    try {
      const response = await ax().post('api/geocode/revgeocode', {
        geocode: payload.userCoordinates,
      });

      if (handleError(response)) {
        const title = response.data.data.items[0].title;
        const userLocationData: AppDeliveryZone = {
          address: title,
          gps_coordinates: payload.userCoordinates,
        };

        if (payload.changeDeliveryZone) {
          payload.changeDeliveryZone(null, payload.userCoordinates, title);
          return title as string;
        } else {
          thunkAPI.dispatch(saveDeliveryZone(userLocationData));
        }

        const coordinates = payload.userCoordinates
          .split(',')
          .map(coordinate => +coordinate);
        payload.dispatch(setUserCoordinates(coordinates.reverse()));
      }
    } catch (error) {
      handleError(error);
    }
  },
);

export const searchProducts = createAsyncThunk(
  'shop/searchProducts',
  async (payload: SearchProductsPayload, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    const apiPayload = {
      name: payload.name,
      offset: payload.offset,
      limit: payload.limit,
    };

    const response = await ax().post('api/search', apiPayload);
    if (handleError(response)) {
      if (user) {
        const params = {
          userId: user.id,
          product: payload.name,
        };
        AnalyticsService.trackEvent('search_product', params);
      } else {
        AnalyticsService.trackEvent('search_product', {
          product: payload.name,
        });
      }

      const data = response.data.data;
      const merge = payload.offset > 0;
      const searchResponse = {
        merge,
        category: data,
      };

      if (data.products.length < payload.limit) {
        payload.setEndReached(true);
      }

      return searchResponse as SearchProductsResponse;
    }
  },
);

export const checkPromoCode = createAsyncThunk(
  'shop/checkPromoCode',
  async (promoCode: string, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const user = state.auth.user;

    try {
      thunkAPI.dispatch(setMainLoading(true));

      const response = await ax().post('api/promo-code/check', {
        promo_code: promoCode,
      });

      thunkAPI.dispatch(setMainLoading(false));

      if (user) {
        const params = {
          userId: user.id,
          promoCode,
        };
        AnalyticsService.trackEvent('check_promo_code', params);
      } else {
        AnalyticsService.trackEvent('check_promo_code', {
          promoCode,
        });
      }

      const checkError = handleError(response, true);
      if (typeof checkError === 'boolean' && checkError) {
        thunkAPI.dispatch(getCart(promoCode));
      } else if (typeof checkError === 'string') {
        thunkAPI.dispatch(setPromoCodeError(checkError));
      }
    } catch (e) {
      thunkAPI.dispatch(setMainLoading(false));
      thunkAPI.dispatch(setPromoCodeError(e.message));
    }
  },
);

export const saveDeliveryZone = createAsyncThunk(
  'shop/saveDeliveryZone',
  async (payload: AppDeliveryZone) => {
    const response = await ax().post('api/user/delivery-area/save', payload);
    return handleError(response);
  },
);
