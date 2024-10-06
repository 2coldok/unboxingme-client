export interface IMyPandoraLogs {
  label: string;
  totalProblems: number;
  coverViewCount: number;
  solverAlias: string | null;
  solvedAt: string | null;
  isCatUncovered: boolean;
  total: number;
  records: {
    failCount: number,
    restrictedUntil: string | null,
    unsealedQuestionIndex: number,
    unboxing: boolean,
    createdAt: string,
    updatedAt: string
  }[];
}

export interface IMyChallenge {
  id: string;
  label: string;
  writer: string;
  title: string;
  description: string;
  currentQuestion: string;
  currentHint: string;
  totalProblems: number;
  failCount: number;
  restrictedUntil: string | null;
  unsealedQuestionIndex: number;
  isPenaltyPeriod: boolean;
  createdAt: string; // (record)
  updatedAt: string; // (record)
}

export interface IMyConquereds {
  total: number;
  pandoras: {
    id: string,
    label: string,
    writer: string,
    title: string,
    description: string,
    firstQuestion: string,
    firstHint: string,
    totalProblems: number,
    solvedAt: string | null
  }[];
}
