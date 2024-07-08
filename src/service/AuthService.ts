import { env } from '../config/env';
import { IHttpClient } from '../network/HttpClient';
import { IAuthStatus } from '../types/auth';

interface IProfile {
  displayName: string,
  photo: string,
}

export interface IAuthService {
  getProfile(): Promise<IProfile>;
  signOut(): Promise<void>;
  signIn(redirectUri: string): void;
  getStatus(): Promise<IAuthStatus>;
}

class AuthService {
  constructor(private httpClient: IHttpClient) {}

  async getProfile() {
    console.log('getProfile 메서드 호출됨'); //
    const data = await this.httpClient.fetch<IProfile, void>('/auth/profile', {
      method: 'GET',
    });

    return data;
  }

  signIn(redirectUri: string) {
    window.location.href = `${env.url.GoogleSignIn}?redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

  async signOut() {
    console.log('signOut 메서드 호출됨');
    await this.httpClient.fetch<void>('/auth/signout', {
      method: 'POST',
    });
  }

  async getStatus() {
    console.log('getStatus 메서드 호출됨');
    const data = await this.httpClient.fetch<IAuthStatus, void>('/auth/status', {
      method: 'GET',
    });

    return data;
  }
}

export default AuthService;
