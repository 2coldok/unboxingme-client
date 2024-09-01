// viewCount

export interface ISearchedPandoraByKeyword {
  id: string;
  uuid: string;
  writer: string;
  title: string;
  description: string;
  coverViewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPandoraCover {
  id: string;
  uuid: string;
  writer: string;
  title: string;
  description: string;
  firstQuestion: string; 
  firstHint: string; 
  totalProblems: number;
  coverViewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface INewPandoraForm {
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  maxOpen: number;
  problems: { question: string, hint: string, answer: string }[];
  cat: string;
}

export interface ICreatedPandora {
  id: string;
  uuid: string;
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  problems: { question: string, hint: string, answer: string }[];
  totalProblems: number;
  cat: string;
  coverViewCount: number;
  solverAlias: string;
  solvedAt: string;
  isCatUncovered: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISolverAlias {
  solverAlias: string;
}

export interface IElpis {
  elpis: string;
}

export interface IMyPandora {
  id: string;
  uuid: string;
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  problems: { question: string, hint: string, answer: string }[];
  totalProblems: number;
  cat: string;
  coverViewCount: number;
  solverAlias: string;
  solvedAt: string;
  isCatUncovered: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
