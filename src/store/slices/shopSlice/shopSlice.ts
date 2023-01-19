import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from 'store/rootStorage';
import {
  Cart,
  MainCategory,
  Category,
  SubCategory,
  ProductDetailed,
  AppDeliveryZone,
  DeliveryZone,
  DeliveryPointExtended,
  PopularCategory,
  ActiveZone,
} from 'types/shop/shopTypes';

import shopBuilders from './shopBuilders';

export interface IShopState {
  deliveryZone: AppDeliveryZone | null;
  deliveryZones: DeliveryZone[];
  deliveryPoint: DeliveryPointExtended | null;
  detailedDeliveryPoint: DeliveryPointExtended | null;
  deliveryPointId: number | null;
  isDeliveryPointButtonVisible: boolean;
  deliveryPointsList: {[k: string]: DeliveryPointExtended} | null;
  id_delivery_date: number | null;
  delivery_pickup: string;
  categories: MainCategory[];
  mainCategories: MainCategory[];
  catalogCategories: SubCategory[];
  popularCategories: PopularCategory[];
  categoryProducts: Category | null;
  popularProducts: ProductDetailed[];
  topProducts: ProductDetailed[];
  recentlyViewedProducts: Category | null;
  product: ProductDetailed | null;
  product_id: number | null;
  subCategories: SubCategory[];
  search: string;
  cart: Cart | null;
  isCartButtonVisible: boolean;
  showCartDelete: boolean;
  searchResults: Category | null;
  activeZones: ActiveZone[];
  userAddress: string;
  userCoordinates: number[];
  promoCode: string;
  promoCodeError: string;
}

const initialState: IShopState = {
  deliveryZone: null,
  deliveryZones: [],
  deliveryPoint: null,
  detailedDeliveryPoint: null,
  deliveryPointId: null,
  isDeliveryPointButtonVisible: true,
  deliveryPointsList: null,
  id_delivery_date: null,
  delivery_pickup: '',
  categories: [],
  mainCategories: [],
  catalogCategories: [],
  categoryProducts: null,
  popularCategories: [],
  popularProducts: [],
  topProducts: [],
  recentlyViewedProducts: null,
  product: null,
  product_id: null,
  subCategories: [],
  search: '',
  cart: null,
  isCartButtonVisible: true,
  showCartDelete: false,
  searchResults: null,
  activeZones: [],
  userAddress: '',
  userCoordinates: [37.6156, 55.7522],
  promoCode: '',
  promoCodeError: '',
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setDeliveryPoint(
      state,
      action: PayloadAction<DeliveryPointExtended | null>,
    ) {
      state.deliveryPoint = action.payload;
    },
    setDeliveryPointId(state, action: PayloadAction<number | null>) {
      state.deliveryPointId = action.payload;
    },
    setDeliveryPoints(
      state,
      action: PayloadAction<{[k: string]: DeliveryPointExtended} | null>,
    ) {
      state.deliveryPointsList = action.payload;
    },
    setDeliveryPointDate(state, action: PayloadAction<number | null>) {
      state.id_delivery_date = action.payload;
    },
    setDeliveryPointPickup(state, action: PayloadAction<string>) {
      state.delivery_pickup = action.payload;
    },
    setDeliveryPointButtonVisible(state, action: PayloadAction<boolean>) {
      state.isDeliveryPointButtonVisible = action.payload;
    },
    setDeliveryZone(state, action: PayloadAction<AppDeliveryZone | null>) {
      state.deliveryZone = action.payload;
    },
    setDeliveryZones(state, action: PayloadAction<DeliveryZone[]>) {
      state.deliveryZones = action.payload;
    },
    setProduct(state, action: PayloadAction<ProductDetailed | null>) {
      state.product = action.payload;
    },
    setProductId(state, action: PayloadAction<number | null>) {
      state.product_id = action.payload;
    },
    setCartButtonVisible(state, action: PayloadAction<boolean>) {
      state.isCartButtonVisible = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setShowCartDelete(state, action: PayloadAction<boolean>) {
      state.showCartDelete = action.payload;
    },
    setPromoCode(state, action: PayloadAction<string>) {
      state.promoCode = action.payload;
    },
    setPromoCodeError(state, action: PayloadAction<string>) {
      state.promoCodeError = action.payload;
    },
    setUserCoordinates(state, action: PayloadAction<number[]>) {
      state.userCoordinates = action.payload;
    },
    deleteSearchResults(state) {
      state.searchResults = null;
    },
    clearUserAddress(state) {
      state.userAddress = '';
    },
  },
  extraReducers: builder => shopBuilders(builder),
});

export const {
  setDeliveryPoint,
  setDeliveryPointId,
  setDeliveryPointButtonVisible,
  setDeliveryPoints,
  setDeliveryPointDate,
  setDeliveryPointPickup,
  setDeliveryZone,
  setDeliveryZones,
  setSearch,
  setProduct,
  setProductId,
  setShowCartDelete,
  setCartButtonVisible,
  setPromoCode,
  setPromoCodeError,
  setUserCoordinates,
  deleteSearchResults,
  clearUserAddress,
} = shopSlice.actions;

export const deliveryZone = (state: RootState) => state.shop.deliveryZone;
export const deliveryZones = (state: RootState) => state.shop.deliveryZones;
export const deliveryPoint = (state: RootState) => state.shop.deliveryPoint;
export const detailedDeliveryPoint = (state: RootState) =>
  state.shop.detailedDeliveryPoint;
export const deliveryPointId = (state: RootState) => state.shop.deliveryPointId;
export const isDeliveryPointButtonVisible = (state: RootState) =>
  state.shop.isDeliveryPointButtonVisible;
export const id_delivery_date = (state: RootState) =>
  state.shop.id_delivery_date;
export const delivery_pickup = (state: RootState) => state.shop.delivery_pickup;
export const deliveryPointsList = (state: RootState) =>
  state.shop.deliveryPointsList;
export const categoryProducts = (state: RootState) =>
  state.shop.categoryProducts;
export const mainCategories = (state: RootState) => state.shop.mainCategories;
export const catalogCategories = (state: RootState) =>
  state.shop.catalogCategories;
export const popularCategories = (state: RootState) =>
  state.shop.popularCategories;
export const popularProducts = (state: RootState) => state.shop.popularProducts;
export const recentlyViewedProducts = (state: RootState) =>
  state.shop.recentlyViewedProducts;
export const product = (state: RootState) => state.shop.product;
export const product_id = (state: RootState) => state.shop.product_id;
export const cart = (state: RootState) => state.shop.cart;
export const isCartButtonVisible = (state: RootState) =>
  state.shop.isCartButtonVisible;
export const showCartDelete = (state: RootState) => state.shop.showCartDelete;
export const searchResults = (state: RootState) => state.shop.searchResults;
export const activeZones = (state: RootState) => state.shop.activeZones;
export const userAddress = (state: RootState) => state.shop.userAddress;
export const userCoordinates = (state: RootState) => state.shop.userCoordinates;
export const promoCode = (state: RootState) => state.shop.promoCode;
export const promoCodeError = (state: RootState) => state.shop.promoCodeError;

export const shopReducer = shopSlice.reducer;
