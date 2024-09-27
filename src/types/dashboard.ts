export interface IMyPandoraLog {
  label: string,
  coverViewCount: number,
  totalProblems: number,
  solverAlias: string | null,
  solvedAt: string | null,
  isCatUncovered: boolean,
  records: {
    failCount: number,
    restrictedUntil: string | null,
    unsealedQuestionIndex: number,
    unboxing: boolean,
    createdAt: string,
    updatedAt: string
  }[]
}

export interface IMyChallenge {
  id: string,
  label: string,
  writer: string,
  title: string,
  description: string,
  currentQuestion: string,
  currentHint: string,
  totalProblems: number,
  failCount: number,
  restrictedUntil: string | null,
  unsealedQuestionIndex: number,
  isPenaltyPeriod: boolean,
  createdAt: string, // (record)
  updatedAt: string // (record)
}

export interface IMyConquered {
  id: string,
  label: string,
  writer: string,
  title: string,
  description: string,
  firstQuestion: string,
  firstHint: string,
  totalProblems: number,
  solvedAt: string | null
}
