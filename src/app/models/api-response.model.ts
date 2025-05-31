export interface ApiResponse<T> {
    statusMessage: number;
    success: boolean;
    response: T;
  }