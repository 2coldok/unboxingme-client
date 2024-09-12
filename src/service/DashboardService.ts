import { IHttpClient } from './../network/HttpClient';
import { IMyChallenge, IPandoraLog } from '../types/dashboard';

export interface IDashboardService {
  getPandoraLog(id: string): Promise<IPandoraLog>;
  getMyChallenges(): Promise<IMyChallenge[]>;
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
}
