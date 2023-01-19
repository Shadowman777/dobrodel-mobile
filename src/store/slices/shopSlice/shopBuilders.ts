import {ActionReducerMapBuilder} from '@reduxjs/toolkit';

import {IShopState} from 'store/slices/shopSlice/shopSlice';
import {
  getCart,
  getCategoryProducts,
  getPopularProducts,
  getRecentlyViewedProducts,
  getProduct,
  getDeliveryPoints,
  getDeliveryPointInfo,
  getCategories,
  getMainCategories,
  getSubCategories,
  searchProducts,
  searchDeliveryZones,
  getActiveZones,
  getUserAddress,
  getCatalogCategories,
  getPopularCategories,
  getTopProducts,
} from 'store/slices/shopSlice/shopThunks';

import {Product} from 'types/shop/shopTypes';

export default function (builder: ActionReducerMapBuilder<IShopState>) {
  builder.addCase(getCategories.fulfilled, (state, action) => {
    state.categories = action.payload || [];
  });
  builder.addCase(getMainCategories.fulfilled, (state, action) => {
    state.mainCategories = action.payload || [];
  });
  builder.addCase(getCatalogCategories.fulfilled, (state, action) => {
    state.catalogCategories = action.payload || [];
  });
  builder.addCase(getPopularCategories.fulfilled, (state, action) => {
    state.popularCategories = action.payload || [];
  });
  builder.addCase(getCategoryProducts.fulfilled, (state, action) => {
    state.categoryProducts = action.payload || null;
  });
  builder.addCase(getPopularProducts.fulfilled, (state, action) => {
    state.popularProducts = action.payload || [];
  });
  builder.addCase(getTopProducts.fulfilled, (state, action) => {
    state.topProducts = action.payload || [];
  });
  builder.addCase(getRecentlyViewedProducts.fulfilled, (state, action) => {
    state.recentlyViewedProducts = action.payload || null;
  });
  builder.addCase(getProduct.fulfilled, (state, action) => {
    state.product = action.payload || null;
  });
  builder.addCase(getSubCategories.fulfilled, (state, action) => {
    state.subCategories = action.payload || [];
  });
  builder.addCase(getCart.fulfilled, (state, action) => {
    state.cart = action.payload || null;
  });
  builder.addCase(getDeliveryPoints.fulfilled, (state, action) => {
    state.deliveryPointsList = action.payload || null;
  });
  builder.addCase(getDeliveryPointInfo.fulfilled, (state, action) => {
    state.detailedDeliveryPoint = action.payload || null;
  });
  builder.addCase(searchProducts.fulfilled, (state, action) => {
    if (action.payload) {
      if (action.payload.merge && state.searchResults) {
        state.searchResults.products = [
          ...(state.searchResults.products as Product[]),
          ...(action.payload.category.products as Product[]),
        ];
      } else {
        state.searchResults = action.payload.category;
      }
    }
  });
  builder.addCase(searchDeliveryZones.fulfilled, (state, action) => {
    state.deliveryZones = action.payload || [];
  });
  builder.addCase(getActiveZones.fulfilled, (state, action) => {
    state.activeZones = action.payload || [];
  });
  builder.addCase(getUserAddress.fulfilled, (state, action) => {
    state.userAddress = action.payload || '';
  });
}
