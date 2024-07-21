import { IChallenge, IGateWay, IInitialGateWay } from './../types/unboxing';
import { HttpError, IHttpClient } from "../network/HttpClient";

export interface IUnboxingService {
  getInitialGateWay(pandoraId: string): Promise<IInitialGateWay>
  setupInitialGateWay(pandoraId: string): Promise<IInitialGateWay>;
  getGateWay(pandoraId: string, challenge: IChallenge): Promise<IGateWay>;
}

export class UnboxingService implements IUnboxingService {
  constructor(private httpClient: IHttpClient) {}

  async getInitialGateWay(pandoraId: string) {
    try {
      const data = await this.httpClient.fetch<IInitialGateWay, void>(`/unboxing/${pandoraId}`, {
        method: 'GET',
      });
      return data;
    } catch (error) {
      if (error instanceof HttpError && error.statusCode === 404) {
        return await this.setupInitialGateWay(pandoraId);
      } else {
        throw error;
      }
    }
  }

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
