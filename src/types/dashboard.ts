export interface IMyPandoraDetail {
  pandora: {
    label: string,
    writer: string,
    title: string,
    description: string,
    keywords: string[],
    problems: { question: string, hint: string, answer: string }[],
    totalProblems: number,
    cat: string,
    coverViewCount: number,
    solverAlias: string | null,
    solvedAt: string | null,
    isCatUncovered: boolean,
    active: boolean,
    createdAt: string
  };
  totalRecords: number;
  record: {
    unsealedQuestionIndex: number,
    unboxing: boolean,
    updatedAt: string
  } | null;
}

export interface IMyChallenge {
  id: string;
  label: string;
  writer: string;
  title: string;
  totalProblems: number;
  coverViewCount: number;
  createdAt: string;
  isCatUncovered: boolean;
}

export interface IMyConquereds {
  total: number;
  pandoras: {
    id: string;
    label: string;
    writer: string;
    title: string;
    totalProblems: number;
    coverViewCount: number;
    createdAt: string;
    isCatUncovered: boolean;
    solverAlias: string | null;
  }[];
}
