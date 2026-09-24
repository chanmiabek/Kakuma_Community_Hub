export type ApiError = { error: string; code?: string };

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type ApiResponse<T> = { data: T } | ApiError;