import { ICSRF } from './../types/auth';
import { IHttpClient } from '../network/HttpClient';
import { IApiResponse } from '../types/api';
import { IMe, IProfile } from '../types/auth';
import { env } from '../config/env';

export interface IAuthService {
  login(redirectUri: string): void // 동작 디테일 체크해보기
  logout(): Promise<IApiResponse<null>>;
  getProfile(): Promise<IApiResponse<IProfile>>;
  me(): Promise<IApiResponse<IMe>>;
  csrfToken(): Promise<IApiResponse<ICSRF>>;
}

class AuthService {
  constructor(private httpClient: IHttpClient) {}

  login(redirectUri: string) {
    window.location.href = `${env.url.googleSignIn}?redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

  async logout() {
    const data = await this.httpClient.fetch<null, void>('/auth/logout', {
      method: 'POST'
    });

    return data;
  }

  async getProfile() {
    const data = await this.httpClient.fetch<IProfile, void>('/auth/profile', {
      method: 'GET'
    });

    return data;
  }

  async me() {
    const data = await this.httpClient.fetch<IMe, void>('/auth/me', {
      method: 'GET'
    });

    return data;
  }

  async csrfToken() {
    const data = await this.httpClient.fetch<ICSRF, void>('/auth/csrf', {
      method: 'GET'
    });

    return data;
  }
}

export default AuthService;
