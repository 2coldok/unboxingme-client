import { IHttpClient } from "../network/HttpClient";

export interface Ipandora {
  id: string,
  title: string,
  description: string,
  problemsLength: number,
  firstQuestion: string,
  firstHint: string,  
  maxOpen: number,
  openCount: number,
  createdAt: Date,
  updatedAt: Date,
}

export interface ISearchService {
  getPandorasByKeyword(keyword: string): Promise<Ipandora[]>;
}

export class SearchService implements ISearchService {
  constructor(private httpClient: IHttpClient) {}
  
  async getPandorasByKeyword(keyword: string) {
    const data = await this.httpClient.fetch<Ipandora[]>(`/search?keyword=${keyword}`, {
      method: 'GET',
    });

    return data;
  }
}
