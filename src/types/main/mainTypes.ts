export type IPage =
  | 'terms_use'
  | 'privacy_policy'
  | 'personal_data'
  | 'faq'
  | 'ways_payment'
  | 'consent_receive_advertising';

type ApplicationUpdateType = 'forced' | 'need_update' | 'suggest_update';

export interface IDate<T = string> {
  year: T;
  month: T;
  day: T;
  hours: T;
  minutes: T;
  seconds: T;
}

export interface IFormattedDate {
  formattedDate: string;
  day: string;
  time: string;
}

export interface Settings {
  number_loaded_categories: number;
  scroll_loaded_categories: number;
  count_product_loaded_categories: number;
  length_code_sms: number;
  regular_format_code_sms: string;
  number_seconds_autosave_profile: number;
  phone_number_format: string;
  max_limit_product_basket: number;
  max_limit_all_products_basket: number;
  delivery_date_not_less: number;
  min_order_amount: number;
  pickup_interval: number;
  application_version: string | null;
  application_type_update: ApplicationUpdateType;
  demo_mode: boolean | null;
  resending_sms: number | null;
  show_onboarding: boolean;
  show_greeting: boolean;
  displaying_choice_delivery_zone_when_placing_an_order: boolean;
  selection_delivery_zone_first_login_after_registration: boolean;
  authorization_required?: boolean;
}

export interface IScrollToIndexInfo<T = number> {
  index: T;
  highestMeasuredFrameIndex: T;
  averageItemLength: T;
}
