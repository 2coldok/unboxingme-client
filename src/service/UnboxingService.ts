import { IChallenge, IGateWay, IInitialGateWay } from './../types/unboxing';
import { IHttpClient } from "../network/HttpClient";

export interface IUnboxingService {
  setupInitialGateWay(pandoraId: string): Promise<IInitialGateWay>;
  getGateWay(pandoraId: string, challenge: IChallenge): Promise<IGateWay>;
}

export class UnboxingService implements IUnboxingService {
  constructor(private httpClient: IHttpClient) {}

  async setupInitialGateWay(pandoraId: string) {
    const data = await this.httpClient.fetch<IInitialGateWay, void>(`/unboxing/${pandoraId}`, {
      method: 'POST',
    });

    return data;
  }

  async getGateWay(pandoraId: string, challenge: IChallenge) {
    const data = await this.httpClient.fetch<IGateWay, IChallenge>(`/unboxing/${pandoraId}`, {
      method: 'PATCH',
      body: challenge
    });

    return data;
  }
}
