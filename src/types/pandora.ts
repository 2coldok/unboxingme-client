export interface IPandoraSearchResults {
  total: number
  pandoras: {
    id: string;
    writer: string;
    title: string;
    totalProblems: number;
    coverViewCount: number;
    createdAt: string;
    isCatUncovered: boolean
  }[]
}

export interface IPandoraList {
  id: string;
  writer: string;
  title: string;
  totalProblems: number;
  coverViewCount: number;
  createdAt: string;
  isCatUncovered: boolean
}

export interface IPandoraCover {
  id: string;
  writer: string;
  title: string;
  obfuscatedCat: string;
  firstQuestion: string; 
  totalProblems: number;
  coverViewCount: number;
  isCatUncovered: boolean;
  createdAt: string;
}

export interface IMyPandoras {
  total: number;
  pandoras: {
    id: string;
    writer: string;
    title: string;
    totalProblems: number;
    coverViewCount: number;
    createdAt: string;
    isCatUncovered: boolean;
  }[];
}

// export interface IMyPandoraDetail {
//   id: string;
//   writer: string;
//   title: string;
//   keywords: string[];
//   problems: { question: string, hint: string, answer: string }[];
//   totalProblems: number;
//   cat: string;
//   coverViewCount: number;
//   solverAlias: string | null;
//   solvedAt: string | null;
//   isCatUncovered: boolean;
//   active: boolean;
//   createdAt: string;
// }

export interface IMyPandoraEdit {
  keywords: string[];
  writer: string;
  title: string;
  problems: { question: string, hint: string | null, answer: string }[];
  cat: string;
}

export interface INewPandoraForm {
  keywords: string[];
  title: string;
  problems: { question: string, hint: string | null, answer: string }[];
  cat: string;
}

export interface IEditPandoraForm {
  keywords: string[];
  title: string;
  problems: { question: string, hint: string | null, answer: string }[];
  cat: string;
}

export interface IEditPandoraResult {
  totalDeletedRecords: number;
}

export interface IDeletePandoraResult {
  totalDeletedRecords: number;
}
