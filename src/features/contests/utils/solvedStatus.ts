import { SolvedStatus } from "@features/contests/components/SolvedStatusFilter";
import type { ReshapedProblem } from "@features/problems/problem";
import { getProblemKey } from "@features/problems/utils";
import { Contest } from "../contest";

// for resolved contest
// 特定のコンテストについて、問題の解いた状態を返す
export const calcSolvedStatusWithIdxes = (
  problemIdxes: string[],
  problemMap: Record<string, ReshapedProblem>,
  solvedSet: Set<string> | undefined
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
      const isSolved = solvedSet?.has(getProblemKey(p));
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

// for virtical contest
export const calcSolvedStatus = (
  contest: Contest,
  solvedSet: Set<string> | undefined
): SolvedStatus => {
  if (contest.problems.length === 0) {
    return "Not Solved yet";
  }

  let isAllSolved = true;
  let isAnySolved = false;
  for (const problem of contest.problems) {
    const isSolved = solvedSet?.has(getProblemKey(problem));
    if (!isSolved) {
      isAllSolved = false;
    } else if (!isAnySolved) {
      isAnySolved = true;
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
