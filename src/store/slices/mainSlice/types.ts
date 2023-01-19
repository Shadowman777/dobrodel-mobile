export interface UpdateNotificationsPayload {
  type: 'order' | 'news';
  status: boolean;
}

export interface SendStatisticsPayload {
  action: string;
  app_version: string;
  params?: {[k: string]: string | number};
}

export interface SendStatisticsLogsPayload {
  event_logs: EventLog[];
}

export interface EventLog<T = string> {
  event_name: T;
  analytics_name: T;
  event_date: T;
  event_result: T;
}
