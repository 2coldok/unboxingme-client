import { IApiResponse } from '../types/api';
import { IMyChallenge, IMyConquered, IMyPandoraLog, IPageForm } from '../types/dashboard';
import { IHttpClient } from './../network/HttpClient';

export interface IDashboardService {
  getMyPandoraLog(id: string): Promise<IApiResponse<IMyPandoraLog>>;
  getMyChallenges(page: number): Promise<IApiResponse<IMyChallenge[]>>;
  getMyConqueredPandoras(page: number): Promise<IApiResponse<IMyConquered[]>>;
}

export class DashboardService implements IDashboardService {
  constructor(private httpClient: IHttpClient) {}

  async getMyPandoraLog(id: string) {
    const data = await this.httpClient.fetch<IMyPandoraLog, void>(`/dashboard/pandora/${id}/log`, {
      method: 'GET'
    });

    return data;
  }

  async getMyChallenges(page: number) {
    const data = await this.httpClient.fetch<IMyChallenge[], IPageForm>('/dashboard/challenges', {
      method: 'GET',
      body: { page: page }
    });

    return data;
  }

  async getMyConqueredPandoras(page: number) {
    const data = await this.httpClient.fetch<IMyConquered[], IPageForm>(`/dashboard/conquered`, {
      method: 'GET',
      body: { page: page }
    });

    return data;
  }
}
