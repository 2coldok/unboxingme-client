export interface IApiResponse<T> {
  success: boolean;
  message: string | null;
  payload?: T
}