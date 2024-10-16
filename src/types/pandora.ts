export interface IPandoraSearchResults {
  total: number
  pandoras: {
    id: string;
    label: string;
    writer: string;
    title: string;
    coverViewCount: number;
    createdAt: string;
  }[]
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

export interface IMyPandoras {
  total: number;
  pandoras: {
    id: string;
    label: string;
    writer: string;
    title: string;
    coverViewCount: number;
    solverAlias: string | null;
    solvedAt: string | null;
    isCatUncovered: boolean;
    active: boolean;
    createdAt: string;
  }[]
}

// export interface IMyPandoraDetail {
//   id: string;
//   label: string;
//   writer: string;
//   title: string;
//   description: string;
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

export interface IEditPandoraResult {
  totalDeletedRecords: number;
}
