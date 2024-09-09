export interface IChallenge {
  currentProblemIndex: number;
  submitAnswer: string;
}

export interface IInitialGateWayMine {
  type: 'mine';
}

export interface IInitialGateWayChallenger {
  type: 'challenger';
  totalProblems: number;
  currentQuestion: string;
  currentHint: string;
  unsealedQuestionIndex: number;
  failCount: number;
  restrictedUntil: string | null;
  isPenaltyPeriod: boolean;
}

export type IInitialGateWay = IInitialGateWayMine | IInitialGateWayChallenger;

export interface IGateWay {
  isCorrect: boolean;
  failCount: number;
  restrictedUntil: string | null; // restrictedUntil의 default값으로 패널티를 한번도 안받았을 경우 null을 반환
  isPenaltyPeriod: boolean;
  unboxing: boolean;
  totalProblems: number;
  unsealedQuestionIndex: number | null; // 모든 문제를 해결했을 경우에만 null을 반환
  question: string | null; // 모든 문제를 해결했을 경우에만 null을 반환
  hint: string | null;// 모든 문제를 해결했을 경우에만 null을 반환
}

// 최종 문제 완료시 IUnboxing
/**-
 * question: null
 * hint: null
 * isCorrect: true
 * unsealedQuestionIndex: null
 * failCount: number
 * restrictedUntil: string | null
 * isPenaltyPeriod: false
 * unbxoing: true
 */