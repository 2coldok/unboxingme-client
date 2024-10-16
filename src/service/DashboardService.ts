import { IApiResponse } from '../types/api';
import { IMyChallenge, IMyConquereds, IMyPandoraDetail } from '../types/dashboard';
import { IHttpClient } from './../network/HttpClient';

export interface IDashboardService {
  getMyPandoraDetail(id: string): Promise<IApiResponse<IMyPandoraDetail>>;
  getMyChallenges(): Promise<IApiResponse<IMyChallenge[]>>;
  getMyConqueredPandoras(page: number): Promise<IApiResponse<IMyConquereds>>;
}

export class DashboardService implements IDashboardService {
  constructor(private httpClient: IHttpClient) {}

  async getMyPandoraDetail(id: string) {
    const data = await this.httpClient.fetch<IMyPandoraDetail, void>(`/dashboard/pandora/${id}`, {
      method: 'GET'
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
