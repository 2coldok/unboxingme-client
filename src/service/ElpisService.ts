import { IElpis } from "../types/elpis";
import { IHttpClient } from "../network/HttpClient";

export interface IElpisService {
  getElpis(pandoraId: string): Promise<IElpis>;
}

export class ElpisService implements IElpisService {
  constructor(private httpClient: IHttpClient) {}

  async getElpis(pandoraId: string) {
    const data = await this.httpClient.fetch<IElpis, void>(`elpis/${pandoraId}`, {
      method: 'GET',
    });

    return data;
  }
}
