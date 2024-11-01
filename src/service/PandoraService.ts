import { IHttpClient } from './../network/HttpClient';
import { INewPandoraForm, IPandoraCover, IPandoraSearchResults, IMyPandoraEdit, IEditPandoraForm, IEditPandoraResult, IMyPandoras, IDeletePandoraResult, IOpenedPandoraGlimpse } from '../types/pandora';
import { IApiResponse } from '../types/api';

export interface IPandoraService {
  getOpenedPandorasGlimpse(): Promise<IApiResponse<IOpenedPandoraGlimpse[]>>;
  getPandoraSearchResult(keyword: string, page: number): Promise<IApiResponse<IPandoraSearchResults>>;
  getPandoraCover(id: string): Promise<IApiResponse<IPandoraCover>>;
  getMyPandoras(page: number): Promise<IApiResponse<IMyPandoras>>;
  getMyPandoraEdit(id: string): Promise<IApiResponse<IMyPandoraEdit>>;
  createPandora(newPandoraForm: INewPandoraForm): Promise<IApiResponse<null>>;
  deleteMyPandora(id: string): Promise<IApiResponse<IDeletePandoraResult>>;
  editMyPandora(id: string, editPandoraForm: IEditPandoraForm): Promise<IApiResponse<IEditPandoraResult>>;
}

export class PandoraService implements IPandoraService {
  constructor(private httpClient: IHttpClient) {}

  async getOpenedPandorasGlimpse() {
    const data = await this.httpClient.fetch<IOpenedPandoraGlimpse[], void>('/pandora/glimpse', {
      method: 'GET'
    });

    return data;
  }

  async getPandoraSearchResult(keyword: string, page: number) {
    const data = await this.httpClient.fetch<IPandoraSearchResults, void>(`/pandora/search?keyword=${keyword}&page=${page}`, {
      method: 'GET',
    });

    return data;
  }

  async getPandoraCover(id: string) {
    const data = await this.httpClient.fetch<IPandoraCover, void>(`/pandora/cover/${id}`, {
      method: 'GET',
    });

    return data;
  }

  async getMyPandoras(page: number) {
    const data = await this.httpClient.fetch<IMyPandoras, void>(`/pandora/mines?page=${page}`, {
      method: 'GET',
    });

    return data;
  }

  async getMyPandoraEdit(id: string) {
    const data = await this.httpClient.fetch<IMyPandoraEdit, void>(`/pandora/edit/${id}`, {
      method: 'GET'
    });

    return data;
  }

  async createPandora(newPandoraForm: INewPandoraForm) {
    const data = await this.httpClient.fetch<null, INewPandoraForm>('/pandora/create', {
      method: 'POST',
      body: newPandoraForm
    });

    return data;
  }

  async deleteMyPandora(id: string) {
    const data = await this.httpClient.fetch<IDeletePandoraResult, void>(`/pandora/delete/${id}`, {
      method: 'DELETE'
    });

    return data;
  }
  
  async editMyPandora(id: string, editPandoraForm: IEditPandoraForm) {
    const data = await this.httpClient.fetch<IEditPandoraResult, IEditPandoraForm>(`/pandora/edit/${id}`, {
      method: 'PUT',
      body: editPandoraForm
    });

    return data;
  }
}
