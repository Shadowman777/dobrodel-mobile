import {
  DeliveryDate,
  DeliveryPoint,
  ProductDetailed,
  Pickup,
} from 'types/shop/shopTypes';

export type StatusText = 'не оплачен' | 'оплачен' | 'доставлен' | 'отменен';

export interface Order {
  order_id: number;
  date_create: string;
  delivery_date_info: DeliveryDate;
  price_amount: number;
  total_amount: number;
  delivery_point: DeliveryPoint;
  comment: string;
  order_code: string;
  status: number;
  status_text: StatusText;
  status_info: string | null;
  status_info_type: 'info' | 'error' | null;
  products: OrderProduct[];
  pickup: Pickup | null;
  order_cancellation: boolean;
  order_pay: boolean;
  is_evaluation: boolean;
}

export interface OrderProduct {
  id: number;
  id_product: number;
  price: string;
  price_amount: string;
  total_amount: string;
  quantity: number;
  discount_percent: number;
  adjustment: OrderProductAdjustment | null;
  product_info: ProductDetailed;
}

interface OrderProductAdjustment {
  type: 'out_of_stock' | 'adjustment';
  text: string;
  amount: string | null;
}

export interface EvaluationAnswer {
  id_evaluation_questions: number;
  quantity: number;
}

export interface IInviteData {
  invitePromoCode: string;
  inviteScreenText: string;
  inviteMessageText: string;
  error: string | null;
}
