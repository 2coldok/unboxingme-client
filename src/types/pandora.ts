export interface ISearchedPandoraByKeyword {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

export interface IPandoraCover {
  id: string;
  writer: string; //
  title: string;
  description: string;
  totalProblems: number;
  maxOpen: number;
  openCount: number;
  viewCount: number;
  firstQuestion: string; //
  firstHint: string; //
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
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  maxOpen: number;
  problems: { question: string, hint: string, answer: string }[];
  cat: string;
  active: boolean;
  openCount: number;
  viewCount: number;
  totalProblems: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMyPandora {
  id: string;
  writer: string;
  title: string;
  description: string;
  keywords: string[];
  maxOpen: number;
  problems: { question: string, hint: string, answer: string }[];
  cat: string;
  active: boolean;
  openCount: number;
  viewCount: number;
  totalProblems: number;
  createdAt: string;
  updatedAt: string;
}
