// viewCount

export interface ISearchedPandoraByKeyword {
  uuid: string;
  writer: string;
  title: string;
  description: string;
  coverViewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPandoraCover {
  uuid: string;
  label: string;
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
  problems: { question: string, hint: string, answer: string }[];
  cat: string;
}

export interface ICreatedPandora {
  uuid: string;
  label: string;
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  problems: { question: string, hint: string, answer: string }[];
  totalProblems: number;
  cat: string;
  coverViewCount: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISolverAliasStatus {
  isSolverAlias: boolean;
}

export interface ISolverAlias {
  solverAlias: string;
}

export interface IElpis {
  elpis: string;
}

export interface IMyPandora {
  uuid: string;
  label: string;
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  problems: { question: string, hint: string, answer: string }[];
  totalProblems: number;
  cat: string;
  coverViewCount: number;
  solverAlias: string | null;
  solvedAt: string | null;
  isCatUncovered: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMyPandoraForEdit {
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  problems: { question: string, hint: string, answer: string }[];
  cat: string;
}
