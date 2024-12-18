import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IApiResponse } from "../types/api";

export class HttpError extends Error {
  statusCode: number;
  statusText: string;
  
  constructor(
    statusCode: number,
    statusText: string,
    message: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;

    Object.setPrototypeOf(this, HttpError.prototype);
  }

}

interface IOptions<B = unknown> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: B;
  headers?: Record<string, string>;
}

export interface IHttpClient {

  fetch<T, B = unknown>(url: string, options: IOptions<B>): Promise<IApiResponse<T>>;
}

export default class HttpClient implements IHttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: { 
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
  }

  async fetch<T, B>(url: string, options: IOptions<B>): Promise<IApiResponse<T>> {
    const { method, body, headers } = options;

    const request = {
      url,
      method,
      headers: {
        ...headers,
      },
      data: body
    };
    
    try {
      const response: AxiosResponse<IApiResponse<T>> = await this.client(request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // 서버에서 응답이 온 경우(2xx 이외의 status code)
        console.log(error);
        if (error.response) {
          const statusCode = error.response.status;
          const statusText = error.response.data?.statusText || '';
          const message = error.message;
          
          throw new HttpError(statusCode, statusText, message); 
        }

        // 서버에게 응답받지 못한 경우(네트워크 문제 또는 요청 설정 문제)
        if (error.request) {
          throw new HttpError(
            0, 
            'server error', 
            '서버로 부터 응답받지 못했습니다.'
          );
        }

        throw new HttpError(
          0, 
          'http request error', 
          `http 요청 설정에 문제가 있습니다`
        );
      }

      throw new HttpError(
        0, 
        'network error', 
        '네트워크 에러 발생'
      );
    }
  }
}
