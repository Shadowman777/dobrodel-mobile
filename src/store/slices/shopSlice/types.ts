import {Dispatch, SetStateAction} from 'react';
import {Category} from 'types/shop/shopTypes';

export interface GetCategoriesPayload {
  categoryId: number;
  categoryName?: string;
  is_all?: boolean;
}

export interface AddToCartProduct {
  id_product: number;
  quantity: number;
}

export interface MultiAddToCartPayload {
  products: AddToCartProduct[];
}

export interface AnotherProductsPayload {
  offset: number;
  limit: number;
}

export interface CategoryProductsPayload {
  category_id: number;
  offset: number;
  limit: number;
  sort: string;
}

export interface SearchProductsPayload {
  name: string;
  limit: number;
  offset: number;
  setEndReached: Dispatch<SetStateAction<boolean>>;
}

export interface SearchProductsResponse {
  merge: boolean;
  category: Category;
}

export interface SearchDeliveryZonesPayload {
  text: string;
}
