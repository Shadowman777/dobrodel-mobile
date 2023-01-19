export interface Action<T = string | null> {
  id: number;
  title: string;
  description: T;
  image_preview_url: string;
  image_url: T;
  type: string;
  status: number;
  created_at: string;
  updated_at: string;
}
