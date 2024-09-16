import { IHttpClient } from './../network/HttpClient';
import { IMyPandora, INewPandoraForm, IPandoraCover, IPandoraSearchResult, IElpis, ISolverAliasStatus, ISolverAlias, IMyPandoraEdit, IEditPandoraForm } from '../types/pandora';
import { IApiResponse } from '../types/api';
// import { IElpis } from '../types/elpis';

export interface IPandoraService {
  getPandoraSearchResult(keyword: string): Promise<IApiResponse<IPandoraSearchResult[]>>;
  getPandoraCover(id: string): Promise<IApiResponse<IPandoraCover>>;
  getMyPandoras(): Promise<IApiResponse<IMyPandora[]>>;
  getMyPandoraEdit(id: string): Promise<IApiResponse<IMyPandoraEdit>>;
  createPandora(newPandoraForm: INewPandoraForm): Promise<IApiResponse<null>>;
  deleteMyPandora(id: string): Promise<IApiResponse<null>>;
  replaceMyPandora(id: string, editPandoraForm: IEditPandoraForm): Promise<IApiResponse<null>>;


  getSolverAliasStatus(pandoraId: string): Promise<ISolverAliasStatus>;
  registerSolverAlias(pandoraId: string, solverAlias: string): Promise<void>;
  getElpis(pandoraId: string): Promise<IElpis>;
}

export class PandoraService implements IPandoraService {
  constructor(private httpClient: IHttpClient) {}

  async getPandoraSearchResult(keyword: string) {
    const data = await this.httpClient.fetch<IApiResponse<IPandoraSearchResult[]>, void>(`/pandora/search?keyword=${keyword}`, {
      method: 'GET',
    });

    return data;
  }

  async getPandoraCover(id: string) {
    const data = await this.httpClient.fetch<IApiResponse<IPandoraCover>, void>(`/pandora/cover/${id}`, {
      method: 'GET',
    });

    return data;
  }

  async getMyPandoras() {
    const data = await this.httpClient.fetch<IApiResponse<IMyPandora[]>, void>('/pandora/mine', {
      method: 'GET',
    });

    return data;
  }

  async getMyPandoraEdit(id: string) {
    const data = await this.httpClient.fetch<IApiResponse<IMyPandoraEdit>, void>(`/pandora/edit/${id}`, {
      method: 'GET'
    })

    return data;
  }

  async createPandora(newPandoraForm: INewPandoraForm) {
    const data = await this.httpClient.fetch<IApiResponse<null>, INewPandoraForm>('/pandora/create', {
      method: 'POST',
      body: newPandoraForm
    });

    return data;
  }

  async deleteMyPandora(id: string) {
    const data = await this.httpClient.fetch<IApiResponse<null>, void>(`/pandora/delete/${id}`, {
      method: 'DELETE'
    });

    return data;
  }
  
  async replaceMyPandora(id: string, editPandoraForm: IEditPandoraForm) {
    const data = await this.httpClient.fetch<IApiResponse<null>, IEditPandoraForm>(`/pandora/replace/${id}`, {
      method: 'PUT',
      body: editPandoraForm
    });

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
