export interface ControllerResponse<T = any> {
  payload?: T;
  message?: string;
}

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  payload: T;
}
