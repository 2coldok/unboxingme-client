import { IHttpClient } from '../network/HttpClient';

interface IProfile {
  displayName: string,
  photo: string,
}

export interface IAuthService {
  getProfile(): Promise<IProfile>;
  signOut(): Promise<void>;
}

class AuthService {
  constructor(private httpClient: IHttpClient) {}

  async getProfile() {
    console.log('getProfile 메서드 호출됨'); //
    const data = await this.httpClient.fetch<IProfile>('/auth/profile', {
      method: 'GET',
    });

    return data;
  }

  async signOut() {
    console.log('signOut 메서드 호출됨'); //
    await this.httpClient.fetch<void>('/auth/signout', {
      method: 'POST',
    });
  }
}

export default AuthService;
