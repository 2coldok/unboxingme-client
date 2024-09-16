import axios, { AxiosInstance, AxiosResponse } from "axios";

export class HttpError extends Error {
  statusCode: number | undefined;
  
  constructor(statusCode: number | undefined, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

interface IOptions<B = unknown> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: B;
  headers?: Record<string, string>;
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
        // 서버에서 응답이 온 경우(2xx 이외의 status code)
        if (error.response) {
          const data = error.response.data;
          const statusCode = error.response.status;
          const message = (data && data.message) ? data.message : '서버에서 메세지 처리하지 않은 에러';
          throw new HttpError(statusCode, message); 
        }

        // 서버에게 응답받지 못한 경우(네트워크 문제 또는 요청 설정 문제)
        if (error.request) {
          throw new HttpError(undefined, '서버로 부터 응답받지 못했습니다.');
        }

        throw new HttpError(undefined, `http 요청 설정에 문제가 있습니다: ${error.message}`);
      }

      throw new HttpError(undefined, '네트워크 에러 발생');
    }
  }
}
