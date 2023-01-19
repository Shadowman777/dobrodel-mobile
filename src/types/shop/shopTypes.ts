type T = number | null;
type P = string | null;

export interface MainCategory {
  id: number;
  name: string;
  sort: number;
  image_url: string | null;
  products: Product[];
}

export interface Cart {
  total_amount: number;
  total_amount_average_market: T;
  total_amount_basket: T;
  total_weight_basket: T;
  quantity_basket: number;
  saving: T;
  info_message: P;
  discount_promo_code: T;
  promo_code_info: P;
  delivery_price: T;
  basket: BasketItem[];
}

export interface BasketItem {
  id: number;
  id_customer: T;
  quantity: number | string;
  total_amount: number;
  total_amount_average_market: number;
  saving: number;
  info_message: P;
  product_info: Product;
}

export interface Product {
  id: number;
  name: string;
  quantity: string | number;
  quantity_2: T;
  quantity_per_unit: T;
  id_category: number;
  description: string;
  sort: T;
  status: T;
  tax: P;
  price: number;
  average_market_value: number;
  unit_measure_name: string;
  unit_measure_2_name: P;
  category_name: string;
  img: P;
}

export interface ProductDetailed extends Product {
  detail: ProductDetail[];
}

export interface ProductDetail {
  name: string;
  value: string;
}

export interface Category {
  limit: number;
  offset: number;
  count?: number;
  products: Product[] | {[k: string]: Product};
  categories?: SubCategory[];
}

export interface PopularCategory {
  id: number;
  name: string;
  image_url: P;
  status: number;
}

export interface PopularCategoryContent {
  id: number;
  name: string;
  products: Product[];
}

export interface SubCategory {
  id: number;
  id_parent: number;
  name: string;
  status: number;
  sort: number;
  image_url: P;
}

export interface AppDeliveryZone {
  id?: number;
  address: string;
  gps_coordinates: string;
}

export interface DeliveryZone {
  id: number;
  title: string;
  categories: any[];
  parsing: string;
  distance: number;
  mapView: any;
  resultType: any;
  houseNumberType: any;
  houseNumberFallback: any;
  scoring: DeliveryZoneScoring;
  position: ZonePosition;
  address: DeliveryZoneAddress;
}

interface DeliveryZoneScoring {
  queryScore: number;
  fieldScore: {[k: string]: number};
}

interface DeliveryZoneAddress {
  label: string;
  city: string;
  district: string;
  subdistrict: string;
  countryName: string;
  countryCode: number;
  county: string;
  countyCode: number;
  state: string;
  stateCode: number;
  houseNumber: number;
  postalCode: number;
  street: string;
}

interface ZonePosition {
  lat: number;
  lng: number;
}

export interface DeliveryPoint {
  id: number;
  name: string;
  id_city: T;
  address: string;
  gps_coordinates: string;
  description: P;
  images: string[];
  status: number;
}

export interface DeliveryPointExtended extends DeliveryPoint {
  date_delivery: DeliveryDateExtended[];
}

export interface DeliveryDate {
  id: number;
  id_delivery_points: number;
  date_start: string;
  date_end: string;
  status: number;
}

interface DeliveryDateExtended extends DeliveryDate {
  convenient_time_receive_order: ConvenientTimeItem[];
}

interface ConvenientTimeItem {
  time: string;
  count_people: number;
}

export interface Pickup {
  id: number;
  id_order: number;
  time: string;
  status: number;
}

export interface ActiveZone {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: any[];
}