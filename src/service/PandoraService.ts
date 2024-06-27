import { IHttpClient } from './../network/HttpClient';
import { ICreatedPandora, IMyPandora, INewPandoraForm, IPandoraCover } from '../types/pandora';

export interface IPandoraService {
  getPandoraCoverById(id: string): Promise<IPandoraCover>;
  createPandora(newPandoraForm: INewPandoraForm): Promise<ICreatedPandora>;
  getMyPandoras(): Promise<IMyPandora[]>;
}

export class PandoraService implements IPandoraService{
  constructor(private httpClient: IHttpClient) {}

  async getPandoraCoverById(id: string) {
    const data = await this.httpClient.fetch<IPandoraCover, void>(`/pandora/${id}`, {
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
    const data = await this.httpClient.fetch<IMyPandora[], void>('/pandora/issuer/details', {
      method: 'GET',
    });

    return data;
  }
}
