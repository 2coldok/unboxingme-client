import { IHttpClient } from './../network/HttpClient';
import { IPandoraCover } from '../types/pandora';

export interface IPandoraService {
  getPandoraCoverById(id: string): Promise<IPandoraCover>;
}

export class PandoraService {
  constructor(private httpClient: IHttpClient) {}

  async getPandoraCoverById(id: string) {
    const data = await this.httpClient.fetch<IPandoraCover>(`/pandora/${id}`, {
      method: 'GET',
    });

    return data;
  }
}
