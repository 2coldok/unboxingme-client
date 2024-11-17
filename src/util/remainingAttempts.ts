const FIRST_CHANCE = 3;
const OTHERS_CHANCE= 1;

export function getRemainingAttempts(failCount: number) {
  if (failCount < FIRST_CHANCE) {
    return FIRST_CHANCE - failCount;
  }
  
  return OTHERS_CHANCE;
}
