import axios, { AxiosInstance, AxiosResponse } from "axios";

interface IOptions<B = unknown> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: B;
  headers?: Record<string, string>;
}

export class HttpError extends Error {
  statusCode: number | undefined;
  
  constructor(message: string, statusCode: number | undefined) {
    super(message);
    this.statusCode = statusCode;
  }
}

export interface IHttpClient {
  fetch<T, B = unknown>(url: string, options: IOptions<B>): Promise<T>;
}

export default class HttpClient implements IHttpClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  async fetch<T, B>(url: string, options: IOptions<B>): Promise<T> {
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
      const response: AxiosResponse<T> = await this.client(request);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        const message = 
          data && data.message ? data.message : '서버에서 메세지 처리하지 않은 error';
        throw new HttpError(message, error.response?.status);
      }
      throw new HttpError('네트워크 에러 발생!', undefined);
    }
  }
}
