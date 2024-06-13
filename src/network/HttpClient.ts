import axios, { AxiosInstance, AxiosResponse } from "axios";

interface IOptions {
  method: string;
  body?: string;
  headers?: Record<string, string>;
}

export interface IHttpClient {
  fetch<T>(url: string, options: IOptions): Promise<T>;
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

  async fetch<T>(url: string, options: IOptions): Promise<T> {
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
          data && data.message ? data.message : '서버에서 메세지 처리하지 않은 error0';
        throw new Error(message);
      }
      throw new Error('네트워크 에러 발생');
    }
  }
}
