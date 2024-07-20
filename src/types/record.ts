export interface IRecord {
  failCount: number;
  restrictedUntil: string | null;
  unsealedQuestionIndex: number | null;
  unboxing: boolean;
  isRestricted: boolean;
}
