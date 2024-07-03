import { IUnboxing, IChallenge } from './../types/unboxing';
import { IHttpClient } from "../network/HttpClient";

export interface IUnboxingService {
  getGateWay(challenge: IChallenge): Promise<IUnboxing>;
}

export class UnboxingService implements IUnboxingService {
  constructor(private httpClient: IHttpClient) {}

  async getGateWay(challenge: IChallenge) {
    const data = await this.httpClient.fetch<IUnboxing, IChallenge>('/unboxing', {
      method: 'POST',
      body: challenge
    });

    return data;
  }
}
