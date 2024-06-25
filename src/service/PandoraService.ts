import { IHttpClient } from './../network/HttpClient';
import { ICreatedPandora, INewPandoraForm, IPandoraCover } from '../types/pandora';

export interface IPandoraService {
  getPandoraCoverById(id: string): Promise<IPandoraCover>;
  createPandora(newPandoraForm: INewPandoraForm): Promise<ICreatedPandora>;
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
}
