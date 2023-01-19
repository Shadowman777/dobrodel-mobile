import {EvaluationAnswer} from 'types/profile/profileTypes';

export interface StartOrderPayload {
  promo_code?: string;
  products: {
    id_product: number;
    quantity: number;
  }[];
}

export interface FinishOrderPayload {
  id_delivery_date: number;
  id_delivery_point: number;
  comment: string | null;
  pickup: string;
  promo_code?: string;
  products: {
    id_product: number;
    quantity: number;
  }[];
}

export interface GetOrdersInfoPayload {
  delivery_orders: boolean;
  pay_orders: boolean;
  pay_orders_info: string;
}

export interface EvaluateOrderPayload {
  id_order: number;
  evaluation: EvaluationAnswer[];
  comment: string;
}

export interface OrdersEvaluationQuestions {
  id: number;
  questions: string;
  description: string;
  status: number;
}

export interface GetRouteResponse {
  geometry: any;
  duration: number;
  distance: string;
}
