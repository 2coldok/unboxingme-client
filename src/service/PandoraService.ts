import { IHttpClient } from './../network/HttpClient';
import { ICreatedPandora, IMyPandora, INewPandoraForm, IPandoraCover, ISearchedPandoraByKeyword, IElpis, ISolverAlias } from '../types/pandora';
// import { IElpis } from '../types/elpis';

export interface IPandoraService {
  getSearchedPandorasByKeyword(keyword: string): Promise<ISearchedPandoraByKeyword[]>;
  getPandoraCoverById(id: string): Promise<IPandoraCover>;
  createPandora(newPandoraForm: INewPandoraForm): Promise<ICreatedPandora>;
  getElpis(pandoraId: string, solverAlias: ISolverAlias): Promise<IElpis>;
  getMyPandoras(): Promise<IMyPandora[]>;
  deleteMyPandora(id: string): Promise<void>;
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

  async getElpis(pandoraId: string, solverAlias: ISolverAlias) {
    const data = await this.httpClient.fetch<IElpis, ISolverAlias>(`/pandora/elpis/${pandoraId}`, {
      method: 'PATCH',
      body: solverAlias,
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
}
