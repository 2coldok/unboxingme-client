// 4xx
export interface IInitialRiddleFailByPenalty {
  RType: 'penalty';
  restrictedUntil: string;
}
// 4xx
export interface IInitialRiddleFailFailByStatus {
  RType: 'status';
  status: 'INACTIVE' | 'NOT_FOUND_RECORD' | 'MINE' | 'SOLVED';
}
// 2xx
export interface IInitialRiddleSuccess {
  RType: 'riddle'
  totalProblems: number;
  currentQuestion: string;
  currentHint: string;
  unsealedQuestionIndex: number;
  failCount: number;
  restrictedUntil: string | null;
  isPenaltyPeriod: boolean;
}
export type TInitialRiddle = IInitialRiddleFailByPenalty | IInitialRiddleFailFailByStatus | IInitialRiddleSuccess;


export interface ISubmitAnswerForm {
  submitAnswer: string;
}

export interface INextRiddle {
  isCorrect: boolean;
  totalProblems: number;
  question: string | null; // 모든 문제를 해결했을 경우에만 null을 반환
  hint: string | null;// 모든 문제를 해결했을 경우에만 null을 반환
  unsealedQuestionIndex: number | null; // 모든 문제를 해결했을 경우에만 null을 반환
  failCount: number;
  restrictedUntil: string | null; // restrictedUntil의 default값으로 패널티를 한번도 안받았을 경우 null을 반환
  isPenaltyPeriod: boolean;
  unboxing: boolean;
}

export interface ISolverAliasStatus {
  isSolverAlias: boolean;
}

export interface INewSolverAliasForm {
  solverAlias: string;
}

export interface INote {
  note: string;
}
