export interface IGlimpse {
  username: string;
  totalProblems: number;
  unsealedQuestionIndex: number;
  unboxing: boolean;
  updatedAt: string; // 서버에서 이미 가공된 날짜. 시간 정보는 제외
}

export interface IMyPandoraDetail {
  pandora: {
    writer: string,
    title: string,
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
  writer: string;
  title: string;
  totalProblems: number;
  coverViewCount: number;
  createdAt: string;
  solvedAt: boolean;
  isCatUncovered: boolean;
  solverAlias: boolean;
}

export interface IMyConquereds {
  total: number;
  pandoras: {
    id: string;
    writer: string;
    title: string;
    totalProblems: number;
    coverViewCount: number;
    createdAt: string;
    solvedAt: boolean;
    isCatUncovered: boolean;
    solverAlias: boolean;
  }[];
}
