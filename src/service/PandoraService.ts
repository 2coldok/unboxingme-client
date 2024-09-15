import { IHttpClient } from './../network/HttpClient';
import { ICreatedPandora, IMyPandora, INewPandoraForm, IPandoraCover, ISearchedPandoraByKeyword, IElpis, IMyPandoraForEdit, ISolverAliasStatus, ISolverAlias } from '../types/pandora';
// import { IElpis } from '../types/elpis';

export interface IPandoraService {
  getSearchedPandorasByKeyword(keyword: string): Promise<ISearchedPandoraByKeyword[]>;
  getPandoraCoverById(id: string): Promise<IPandoraCover>;
  createPandora(newPandoraForm: INewPandoraForm): Promise<ICreatedPandora>;
  getMyPandoras(): Promise<IMyPandora[]>;
  deleteMyPandora(id: string): Promise<void>;
  replaceMyPandora(id: string, newPandoraForm: INewPandoraForm): Promise<void>;
  getMyPandoraForEdit(id: string): Promise<IMyPandoraForEdit>;
  getSolverAliasStatus(pandoraId: string): Promise<ISolverAliasStatus>;
  registerSolverAlias(pandoraId: string, solverAlias: string): Promise<void>;
  getElpis(pandoraId: string): Promise<IElpis>;
}

export class PandoraService implements IPandoraService {
  constructor(private httpClient: IHttpClient) {}

  async getSearchedPandorasByKeyword(keyword: string) {
    const data = await this.httpClient.fetch<ISearchedPandoraByKeyword[]>(`/pandora/search?keyword=${keyword}`, {
      method: 'GET',
    });

    return data;
  }

  async getPandoraCoverById(id: string) {
    const data = await this.httpClient.fetch<IPandoraCover, void>(`/pandora/cover/${id}`, {
      method: 'GET',
    });

    return data;
  }

  async createPandora(newPandoraForm: INewPandoraForm) {
    const data = await this.httpClient.fetch<ICreatedPandora, INewPandoraForm>('/pandora/create', {
      method: 'POST',
      body: newPandoraForm
    });

    return data;
  }

  async getMyPandoras() {
    const data = await this.httpClient.fetch<IMyPandora[], void>('/pandora/mine', {
      method: 'GET',
    });

    return data;
  }

  async deleteMyPandora(id: string) {
    await this.httpClient.fetch<void, void>(`/pandora/delete/${id}`, {
      method: 'DELETE'
    });
  }
  
  async replaceMyPandora(id: string, newPandoraForm: INewPandoraForm) {
    await this.httpClient.fetch<void, INewPandoraForm>(`/pandora/replace/${id}`, {
      method: 'PUT',
      body: newPandoraForm
    });
  }

  async getMyPandoraForEdit(id: string) {
    const data = await this.httpClient.fetch<IMyPandoraForEdit, void>(`/pandora/edit/${id}`, {
      method: 'GET'
    })

    return data;
  }

  async getSolverAliasStatus(pandoraId: string) {

    const data = await this.httpClient.fetch<ISolverAliasStatus, void>(`/pandora/solveralias/${pandoraId}`, {
      method: 'GET'
    });

    return data;
  }

  async registerSolverAlias(pandoraId: string, solverAlias: string) {
    await this.httpClient.fetch<void, ISolverAlias>(`/pandora/solverAlias/${pandoraId}`, {
      method: 'PATCH',
      body: { solverAlias: solverAlias }
    });
  }

  async getElpis(pandoraId: string) {
    const data = await this.httpClient.fetch<IElpis, void>(`/pandora/elpis/${pandoraId}`, {
      method: 'PATCH'
    });

    return data
  }
}
