export interface IInitialRiddleFailByPenalty {
  status: 'penalty';
  failCount: number;
  restrictedUntil: string;
}

export interface IInitialRiddleFailbyIneligible {
  status: 'ineligible';
  reason: 'INACTIVE' | 'NOT_FOUND_RECORD' | 'MINE' | 'SOLVED';
}

export interface IInitialRiddleSuccess {
  status: 'riddle'
  question: string;
  hint: string;
  unsealedQuestionIndex: number;
  totalProblems: number;
  failCount: number;
}
export type TInitialRiddle = IInitialRiddleFailByPenalty | IInitialRiddleFailbyIneligible | IInitialRiddleSuccess;

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
  question: string;
  hint: string;
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
  label: string;
  writer: string;
  title: string;
  description: string;
  coverViewCount: number;
  cat: string;
  createdAt: string;
}
