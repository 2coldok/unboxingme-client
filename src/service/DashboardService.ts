import { IHttpClient } from './../network/HttpClient';
import { IMyChallenge, IMyConqueredPandora, IPandoraLog } from '../types/dashboard';

export interface IDashboardService {
  getPandoraLog(id: string): Promise<IPandoraLog>;
  getMyChallenges(): Promise<IMyChallenge[]>;
  getMyConqueredPandoras(): Promise<IMyConqueredPandora[]>;
}

export class DashboardService implements IDashboardService {
  constructor(private httpClient: IHttpClient) {}

  async getPandoraLog(id: string) {
    const data = await this.httpClient.fetch<IPandoraLog, void>(`/dashboard/${id}/log`, {
      method: 'GET',
    });

    return data;
  }

  async getMyChallenges() {
    const data = await this.httpClient.fetch<IMyChallenge[], void>('/dashboard/challenges', {
      method: 'GET',
    });

    return data;
  }

  async getMyConqueredPandoras() {
    const data = await this.httpClient.fetch<IMyConqueredPandora[], void>(`/dashboard/conquered`, {
      method: 'GET',
    });

    return data;
  }
}
