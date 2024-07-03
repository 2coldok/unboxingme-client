export interface IChallenge {
  pandoraId: string;
  currentProblemIndex: number;
  submitAnswer: string;
}

export interface IUnboxing {
  question: string | null;
  hint: string | null;
  isCorrect: boolean | null;
  unsealedQuestionIndex: number;
  failCount: number;
  restrictedUntil: string;
  unboxing: boolean;
  cat: string | null;
}
