import { IChallenge, IElpis, IGateWay, IInitialGateWay, INewSolverAliasForm, ISolverAliasStatus } from './../types/unboxing';
import { HttpError, IHttpClient } from "../network/HttpClient";

export interface IUnboxingService {
  getInitialGateWay(pandoraId: string): Promise<IInitialGateWay>;
  setupInitialGateWay(pandoraId: string): Promise<IInitialGateWay>;
  getGateWay(pandoraId: string, challenge: IChallenge): Promise<IGateWay>;
  getSolverAliasStatus(id: string): Promise<ISolverAliasStatus>;
  registerSolverAlias(id: string, solverAlias: string): Promise<void>;
  getElpis(id: string): Promise<IElpis>;
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

  async getSolverAliasStatus(id: string) {

    const data = await this.httpClient.fetch<ISolverAliasStatus, void>(`/unboxing/solveralias/${id}`, {
      method: 'GET'
    });

    return data;
  }

  async registerSolverAlias(id: string, solverAlias: string) {
    await this.httpClient.fetch<void, INewSolverAliasForm>(`/unboxing/solverAlias/${id}`, {
      method: 'PATCH',
      body: { solverAlias: solverAlias }
    });
  }

  async getElpis(id: string) {
    const data = await this.httpClient.fetch<IElpis, void>(`/unboxing/elpis/${id}`, {
      method: 'PATCH'
    });

    return data;
  }
}
