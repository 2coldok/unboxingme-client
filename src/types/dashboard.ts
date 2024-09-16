import { IMyPandora } from "./pandora";

export interface ILog {
  pandora: string;
  failCount: number;
  restrictedUntil: string | null;
  unsealedQuestionIndex: number | null;
  unboxing: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPandoraLog extends IMyPandora {
  logs: ILog[];
}

export interface IMyChallenge {
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

export interface IMyConqueredPandora {
  uuid: string;
  label: string;
  writer: string;
  title: string;
  description: string;
  firstQuestion: string;
  firstHint: string;
  totalProblems: number;
  solvedAt: string | null;
  coverViewCount: number;
}
