export interface IChallenge {
  currentProblemIndex: number;
  submitAnswer: string;
}

export interface IInitialGateWay {
  totalProblems: number;
  currentQuestion: string | null;
  currentHint: string | null;
  unsealedQuestionIndex: number | null;
  failCount: number;
  restrictedUntil: string | null;
  isPenaltyPeriod: boolean;
  unboxing: boolean;
}

export interface IGateWay {
  question: string | null;
  hint: string | null;
  isCorrect: boolean;
  unsealedQuestionIndex: number | null; // 모든 문제를 해결했을 경우에만 null을 반환
  failCount: number;
  restrictedUntil: string | null; // restrictedUntil의 default값으로 패널티를 한번도 안받았을 경우 null을 반환
  isPenaltyPeriod: boolean;
  unboxing: boolean;
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