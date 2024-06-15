import { ISearchedPandoraByKeyword } from "../types/pandora";
import { IHttpClient } from "../network/HttpClient";

export interface ISearchService {
  getSearchedPandorasByKeyword(keyword: string): Promise<ISearchedPandoraByKeyword[]>;
}

export class SearchService implements ISearchService {
  constructor(private httpClient: IHttpClient) {}
  
  async getSearchedPandorasByKeyword(keyword: string) {
    const data = await this.httpClient.fetch<ISearchedPandoraByKeyword[]>(`/search?keyword=${keyword}`, {
      method: 'GET',
    });

    return data;
  }
}
