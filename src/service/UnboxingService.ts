import { TInitialRiddle, TNextRiddle, INewSolverAliasForm, ISolverAliasStatus, INote, ISubmitAnswerForm } from './../types/unboxing';
import { IHttpClient } from "../network/HttpClient";
import { IApiResponse } from '../types/api';

export interface IUnboxingService {
  setInitialRiddle(id: string, csrfToken: string): Promise<IApiResponse<TInitialRiddle>>;
  getNextRiddle(id: string, submitAnswer: string, csrfToken: string): Promise<IApiResponse<TNextRiddle>>;
  getSolverAliasStatus(id: string, csrfToken: string): Promise<IApiResponse<ISolverAliasStatus>>;
  registerSolverAlias(id: string, solverAlias: string, csrfToken: string): Promise<IApiResponse<null>>;
  getNote(id: string, csrfToken: string): Promise<IApiResponse<INote>>;
}

export class UnboxingService implements IUnboxingService {
  constructor(private httpClient: IHttpClient) {}

  async setInitialRiddle(id: string, csrfToken: string) {
    return await this.httpClient.fetch<TInitialRiddle, void>(`/unboxing/pandora/${id}/riddle`, {
      method: 'POST',
      headers: {
        'Riddlenote-Csrf-Token': csrfToken
      }
    });
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
      method: 'DELETE',
      headers: {
        'Riddlenote-Csrf-Token': csrfToken
      }
    });

    return data;
  }
}
