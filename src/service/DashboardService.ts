import { IHttpClient } from './../network/HttpClient';
import { IPandoraLog } from '../types/dashboard';

export interface IDashboardService {
  getPandoraLog(id: string): Promise<IPandoraLog>;
}

export class DashboardService implements IDashboardService {
  constructor(private httpClient: IHttpClient) {}

  async getPandoraLog(id: string) {
    const data = await this.httpClient.fetch<IPandoraLog, void>(`/dashboard/${id}/log`, {
      method: 'GET',
    });

    return data;
  }
}


