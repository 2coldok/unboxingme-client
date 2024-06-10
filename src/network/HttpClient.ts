
interface IOptions {
  method: string;
  body?: string;
  headers?: Record<string, string>;
}

interface IHttpClient {
  fetch<T>(url: string, options: IOptions): Promise<T>;
}

export default class HttpClient implements IHttpClient {
  constructor(private baseURL: string) {}

  async fetch<T>(url: string, options: IOptions): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.log('서버 응답 메세지의 body가 비어있음.');
    }
    
    // 패널티 기간 todo
    // if (response.status === 403) {

    // }

    if (response.status > 299 || response.status < 200) {
      const message = data && data.message ? data.message : '서버에서 message 처리하지 않은 오류';
      const error = new Error(message);

      
      throw error;
    }

    // todo 40
    
    return data;
  }
}
