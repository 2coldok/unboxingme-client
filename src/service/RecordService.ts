import { IHttpClient } from './../network/HttpClient';
import { IRecord } from '../types/record';

export interface IRecordService {
  getRecord(pandoraId: string): Promise<IRecord>;
}

export class RecordService implements IRecordService {
  constructor(private httpClient: IHttpClient) {}

  async getRecord(pandoraId: string) {
    const data = await this.httpClient.fetch<IRecord, void>(`/record/${pandoraId}`, {
      method: 'GET',
    });

    return data;
  }
}
