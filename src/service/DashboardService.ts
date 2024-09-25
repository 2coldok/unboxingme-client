import { IApiResponse } from '../types/api';
import { IMyChallenge, IMyConquered, IMyPandoraLog } from '../types/dashboard';
import { IHttpClient } from './../network/HttpClient';

export interface IDashboardService {
  getMyPandoraLog(id: string, page: number): Promise<IApiResponse<IMyPandoraLog>>;
  getMyChallenges(page: number): Promise<IApiResponse<IMyChallenge[]>>;
  getMyConqueredPandoras(page: number): Promise<IApiResponse<IMyConquered[]>>;
}

export class DashboardService implements IDashboardService {
  constructor(private httpClient: IHttpClient) {}

  async getMyPandoraLog(id: string, page: number) {
    const data = await this.httpClient.fetch<IMyPandoraLog, void>(`/dashboard/pandora/${id}/log?page=${page}`, {
      method: 'GET'
    });

    return data;
  }

  async getMyChallenges(page: number) {
    const data = await this.httpClient.fetch<IMyChallenge[], void>(`/dashboard/challenges?page=${page}`, {
      method: 'GET',
    });

    return data;
  }

  async getMyConqueredPandoras(page: number) {
    const data = await this.httpClient.fetch<IMyConquered[], void>(`/dashboard/conquered?page=${page}`, {
      method: 'GET',
    });

    return data;
  }
}
