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

export interface ILog {
  pandora: string;
  failCount: number;
  restrictedUntil: string;
  unsealedQuestionIndex: number;
  unboxing: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPandoraLog extends IMyPandora {
  logs: ILog[];
}
