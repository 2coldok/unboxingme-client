export interface IInitialRiddleFailByPenalty {
  status: 'penalty';
  restrictedUntil: string;
}

export interface IInitialRiddleSuccess {
  status: 'riddle'
  question: string;
  hint: string | null;
  unsealedQuestionIndex: number;
  totalProblems: number;
  failCount: number;
}
export type TInitialRiddle = IInitialRiddleFailByPenalty | IInitialRiddleSuccess;

/***********************************************/

// 2xx
export interface INextRiddlePenalty {
  status: 'penalty';
  failCount: number;
  restrictedUntil: string;
}

// 2xx
export interface INextRiddleEnd {
  status: 'end';
}

// 2xx
export interface INextRiddleChallengeable {
  status: 'riddle';
  isCorrect: boolean;
  question: string;
  hint: string | null;
  unsealedQuestionIndex: number;
  totalProblems: number;
  failCount: number;
}

export type TNextRiddle = INextRiddlePenalty | INextRiddleEnd | INextRiddleChallengeable;

/***********************************************/

export interface ISubmitAnswerForm {
  submitAnswer: string;
}

export interface ISolverAliasStatus {
  isSolverAlias: boolean;
}

export interface INewSolverAliasForm {
  solverAlias: string;
}

/***********************************************/

export interface INote {
  writer: string | null;
  title: string | null;
  totalProblems: number;
  coverViewCount: number;
  isCatUncovered: boolean;
  createdAt: string;
  solvedAt: string;
  solverAlias: string;
  cat: string;
}
