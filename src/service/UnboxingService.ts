import { INewChallengeForm, TInitialRiddle, INextRiddle, INewSolverAliasForm, ISolverAliasStatus, INote } from './../types/unboxing';
import { IHttpClient } from "../network/HttpClient";
import { IApiResponse } from '../types/api';

export interface IUnboxingService {
  getInitialRiddle(id: string): Promise<IApiResponse<TInitialRiddle>>;
  setupInitialRiddle(id: string): Promise<IApiResponse<TInitialRiddle>>;
  getNextRiddle(id: string, challengeForm: INewChallengeForm): Promise<IApiResponse<INextRiddle>>;
  getSolverAliasStatus(id: string): Promise<IApiResponse<ISolverAliasStatus>>;
  registerSolverAlias(id: string, solverAlias: string): Promise<IApiResponse<null>>;
  getNote(id: string): Promise<IApiResponse<INote>>;
}

export class UnboxingService implements IUnboxingService {
  constructor(private httpClient: IHttpClient) {}

  async getInitialRiddle(id: string) {
    const data = await this.httpClient.fetch<TInitialRiddle, void>(`/unboxing/pandora/${id}/riddle`, {
      method: 'GET',
    });

    return data;
  }

  async setupInitialRiddle(id: string) {
    const data = await this.httpClient.fetch<TInitialRiddle, void>(`/unboxing/pandora/${id}/riddle`, {
      method: 'POST',
    });

    return data;
  }

  async getNextRiddle(id: string, challengeForm: INewChallengeForm) {
    const data = await this.httpClient.fetch<INextRiddle, INewChallengeForm>(`/unboxing/pandora/${id}/riddle`, {
      method: 'PATCH',
      body: challengeForm
    });

    return data;
  }

  async getSolverAliasStatus(id: string) {
    const data = await this.httpClient.fetch<ISolverAliasStatus, void>(`/unboxing/pandora/${id}/solveralias`, {
      method: 'GET'
    });

    return data;
  }

  async registerSolverAlias(id: string, solverAlias: string) {
    const data = await this.httpClient.fetch<null, INewSolverAliasForm>(`/unboxing/pandora/${id}/solveralias`, {
      method: 'PATCH',
      body: { solverAlias: solverAlias }
    });

    return data;
  }

  async getNote(id: string) {
    const data = await this.httpClient.fetch<INote, void>(`/unboxing/pandora/${id}/note`, {
      method: 'PATCH'
    });

    return data;
  }
}
