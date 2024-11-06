import { useQuery } from "@tanstack/react-query";
import { PandoraService } from "../service/PandoraService";
import { env } from "../config/env";
import HttpClient from "../network/HttpClient";
import { SEARCH_KEYWORD } from "../constant/constraints";
import { DashboardService } from "../service/DashboardService";

const httpClient = new HttpClient(env.url.serverBaseURL);
const pandoraService = new PandoraService(httpClient);
const dashboardService = new DashboardService(httpClient);

/**
 * pandoraService
 */
export const useSearchResultQuery = (keyword: string, page: number) => {
  return useQuery({
    queryKey: ['searchResult', { keyword, page }],
    queryFn: () => pandoraService.getPandoraSearchResult(keyword, page),
    staleTime:  3 * 60 * 1000,
    enabled: !!keyword && keyword.length < SEARCH_KEYWORD.maxLength && page > 0
  });
}

export const useCoverQuery = (id: string) => {
  return useQuery({
    queryKey: ['cover', { id }],
    queryFn: () => pandoraService.getPandoraCover(id),
    staleTime:  5 * 60 * 1000,
    enabled: !!id
  });
}

export const useMinesQuery = (page: number) => {
  return useQuery({
    queryKey: ['mines', { page }],
    queryFn: () => pandoraService.getMyPandoras(page),
    staleTime: 5 * 60 * 1000,
    enabled: page > 0
  });
};


/**
 * dashboardService
 */
export const useChallengesQuery = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: () => dashboardService.getMyChallenges(),
    staleTime: 5 * 60 * 1000
  });
};

export const useConqueredsQuery = (page: number) => {
  return useQuery({
    queryKey: ['conquereds', { page }],
    queryFn: () => dashboardService.getMyConqueredPandoras(page),
    staleTime: 5 * 60 * 1000,
    enabled: page > 0
  });
}
