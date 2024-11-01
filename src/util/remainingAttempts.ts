const LEVEL1_CHANCE = 3;
const LEVEL2_CHANCE = 2;
const LEVEL3_CHANCE = 1;

export function getRemainingAttempts(failCount: number) {
  if (failCount < LEVEL1_CHANCE) {
    return LEVEL1_CHANCE - failCount;
  }

  if (failCount < LEVEL2_CHANCE) {
    return LEVEL2_CHANCE - failCount;
  }

  return LEVEL3_CHANCE;
}
