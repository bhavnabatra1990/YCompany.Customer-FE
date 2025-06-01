export interface ApiResponse<T> {
    statusMessage: string;
    success: boolean;
    response: T;
  }