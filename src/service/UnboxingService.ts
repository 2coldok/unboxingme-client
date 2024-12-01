import { TInitialRiddle, TNextRiddle, INewSolverAliasForm, ISolverAliasStatus, INote, ISubmitAnswerForm } from './../types/unboxing';
import { IHttpClient } from "../network/HttpClient";
import { IApiResponse } from '../types/api';

export interface IUnboxingService {
  getInitialRiddle(id: string, csrfToken: string): Promise<IApiResponse<TInitialRiddle>>;
  setupInitialRiddle(id: string, csrfToken: string): Promise<IApiResponse<TInitialRiddle>>;
  getNextRiddle(id: string, submitAnswer: string, csrfToken: string): Promise<IApiResponse<TNextRiddle>>;
  getSolverAliasStatus(id: string, csrfToken: string): Promise<IApiResponse<ISolverAliasStatus>>;
  registerSolverAlias(id: string, solverAlias: string, csrfToken: string): Promise<IApiResponse<null>>;
  getNote(id: string, csrfToken: string): Promise<IApiResponse<INote>>;
}

export class UnboxingService implements IUnboxingService {
  constructor(private httpClient: IHttpClient) {}

  async getInitialRiddle(id: string, csrfToken: string) {
    const data = await this.httpClient.fetch<TInitialRiddle, void>(`/unboxing/pandora/${id}/riddle`, {
      method: 'GET',
      headers: {
        'Riddlenote-Csrf-Token': csrfToken
      }
    });

    const payload = data.payload;
    if (payload.status === 'ineligible' && payload.reason === 'NOT_FOUND_RECORD') {
      return this.setupInitialRiddle(id, csrfToken);
    }

    return data;
  }

  async setupInitialRiddle(id: string, csrfToken: string) {
    const data = await this.httpClient.fetch<TInitialRiddle, void>(`/unboxing/pandora/${id}/riddle`, {
      method: 'POST',
      headers: {
        'Riddlenote-Csrf-Token': csrfToken
      }
    });

    return data;
  }

  async getNextRiddle(id: string, submitAnswer: string, csrfToken: string) {
    const data = await this.httpClient.fetch<TNextRiddle, ISubmitAnswerForm>(`/unboxing/pandora/${id}/riddle`, {
      method: 'PATCH',
      body: { submitAnswer: submitAnswer },
      headers: {
        'Riddlenote-Csrf-Token': csrfToken
      }
    });

    return data;
  }

  async getSolverAliasStatus(id: string, csrfToken: string) {
    const data = await this.httpClient.fetch<ISolverAliasStatus, void>(`/unboxing/pandora/${id}/solveralias`, {
      method: 'GET',
      headers: {
        'Riddlenote-Csrf-Token': csrfToken
      }
    });

    return data;
  }

  async registerSolverAlias(id: string, solverAlias: string, csrfToken: string) {
    const data = await this.httpClient.fetch<null, INewSolverAliasForm>(`/unboxing/pandora/${id}/solveralias`, {
      method: 'PATCH',
      body: { solverAlias: solverAlias },
      headers: {
        'Riddlenote-Csrf-Token': csrfToken
      }
    });

    return data;
  }

  async getNote(id: string, csrfToken: string) {
    const data = await this.httpClient.fetch<INote, void>(`/unboxing/pandora/${id}/note`, {
      method: 'GET',
      headers: {
        'Riddlenote-Csrf-Token': csrfToken
      }
    });

    return data;
  }
}
