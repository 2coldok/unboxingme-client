export interface IChallenge {
  pandoraId: string;
  currentProblemIndex: number;
  submitAnswer: string;
}

export interface IUnboxing {
  question: string | null;
  hint: string | null;
  isCorrect: boolean;
  unsealedQuestionIndex: number | null; // 모든 문제를 해결했을 경우에만 null을 반환
  failCount: number;
  restrictedUntil: string | null; // restrictedUntil의 default값으로 패널티를 한번도 안받았을 경우 null을 반환
  unboxing: boolean;
  cat: string | null;
}
