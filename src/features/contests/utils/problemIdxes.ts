import type {
  Classification,
  ReshapedContest,
} from "@features/contests/contest";

// used for some work in problem idx
// In most cases, problem's "problem idx" is A, B, C, D, ...
// but some problem's "problem idx" is 01, 02, 03, 04, ...
export const normalizeProblemIndex = (idx: string) => {
  if (/^\d+$/.test(idx)) {
    return String.fromCharCode(parseInt(idx, 10) + 64);
  } else if (idx === "GP1") {
    // for ICPC 2022 Online Challenge powered by HUAWEI - Problem 1
    return "A";
  } else if (idx === "GP2") {
    // for ICPC 2022 Online Challenge powered by HUAWEI - Problem 1
    return "B";
  } else if (/^[A-Za-z]\d+/.test(idx)) {
    return idx.charAt(0);
  } else {
    return idx;
  }
};

export const getProblemIdxFromClassification = (
  contests: ReshapedContest[],
  classification: Classification
): string[] => {
  const getSortedIdxes = (idxes: string[]): string[] => {
    return idxes.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  };

  if (classification === "All") {
    const allIdxes = Array.from(
      new Set(
        contests.flatMap((contest) =>
          contest.problems.map((problem) =>
            normalizeProblemIndex(problem.index)
          )
        )
      )
    );
    return getSortedIdxes(allIdxes);
  }

  const filteredContests = contests.filter(
    (contest) => contest.classification === classification
  );
  const idxes = Array.from(
    new Set(
      filteredContests.flatMap((contest) =>
        contest.problems.map((problem) => normalizeProblemIndex(problem.index))
      )
    )
  );
  return getSortedIdxes(idxes);
};
