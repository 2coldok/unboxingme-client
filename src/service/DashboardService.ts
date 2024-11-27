import { IApiResponse } from '../types/api';
import { IGlimpse, IMyChallenge, IMyConquereds, IMyPandoraDetail } from '../types/dashboard';
import { IHttpClient } from './../network/HttpClient';

export interface IDashboardService {
  getGlimpses(): Promise<IApiResponse<IGlimpse[]>>;
  getMyPandoraDetail(id: string, csrfToken: string): Promise<IApiResponse<IMyPandoraDetail>>;
  getMyChallenges(): Promise<IApiResponse<IMyChallenge[]>>;
  getMyConqueredPandoras(page: number): Promise<IApiResponse<IMyConquereds>>;
}

export class DashboardService implements IDashboardService {
  constructor(private httpClient: IHttpClient) {}

  async getGlimpses() {
    const data = await this.httpClient.fetch<IGlimpse[], void>('/dashboard/glimpse', {
      method: 'GET'
    });

    return data;
  }

  async getMyPandoraDetail(id: string, csrfToken: string) {
    const data = await this.httpClient.fetch<IMyPandoraDetail, void>(`/dashboard/pandora/${id}`, {
      method: 'GET',
      headers: {
        'Riddlenote-Csrf-Token': csrfToken
      }
    });

    return data;
  }

  // 최근 도전한 10개만 보여줌
  async getMyChallenges() {
    const data = await this.httpClient.fetch<IMyChallenge[], void>('/dashboard/challenges', {
      method: 'GET',
    });

    return data;
  }

  async getMyConqueredPandoras(page: number) {
    const data = await this.httpClient.fetch<IMyConquereds, void>(`/dashboard/conquered?page=${page}`, {
      method: 'GET',
    });

    return data;
  }
}
