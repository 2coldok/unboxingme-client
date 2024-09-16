export interface IPandoraSearchResult {
  id: string;
  writer: string;
  title: string;
  description: string;
  coverViewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPandoraCover {
  id: string;
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

export interface IMyPandora {
  id: string;
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

export interface IMyPandoraEdit {
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  problems: { question: string, hint: string, answer: string }[];
  cat: string;
}

export interface INewPandoraForm {
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  problems: { question: string, hint: string, answer: string }[];
  cat: string;
}

export interface IEditPandoraForm {
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  problems: { question: string, hint: string, answer: string }[];
  cat: string;
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


