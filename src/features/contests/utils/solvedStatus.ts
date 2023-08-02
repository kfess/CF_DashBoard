import { SolvedStatus } from "@features/contests/components/SolvedStatusFilter";
import type { ReshapedProblem } from "@features/problems/problem";
import { getProblemKey } from "@features/problems/utils";

// 特定のコンテストについて、問題の解いた状態を返す
export const calcSolvedStatus = (
  problemIdxes: string[],
  problemMap: Record<string, ReshapedProblem>,
  solvedSet: Set<string> | undefined,
  contestId: number
): SolvedStatus => {
  const hasValidProblem = problemIdxes.some(
    (idx) => problemMap[idx] !== undefined && problemMap[idx] !== null
  );

  if (!hasValidProblem) {
    return "Not Solved yet";
  }

  let isAllSolved = true;
  let isAnySolved = false;
  for (const idx of problemIdxes) {
    const problem = problemMap[idx];
    const indexedProblems = problem?.indexedProblems || [];
    for (const p of indexedProblems) {
      const isSolved = solvedSet?.has(
        getProblemKey(contestId, p.index, p.name)
      );
      if (!isSolved) {
        isAllSolved = false;
      } else if (!isAnySolved) {
        isAnySolved = true;
      }

      if (isAnySolved && !isAllSolved) {
        break;
      }
    }

    if (isAnySolved && !isAllSolved) {
      break;
    }
  }

  if (isAllSolved) {
    return "Completed";
  } else if (isAnySolved) {
    return "Attempting";
  } else {
    return "Not Solved yet";
  }
};
