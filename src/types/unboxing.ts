export interface IChallenge {
  pandoraId: string;
  currentProblemIndex: number;
  submitAnswer: string;
}

export interface IUnboxing {
  question: string | null;
  hint: string | null;
  isCorrect: boolean;
  unsealedQuestionIndex: number | null;
  failCount: number;
  restrictedUntil: string;
  unboxing: boolean;
  cat: string | null;
}
