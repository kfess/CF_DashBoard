import type { Contest, Classification } from "@features/contests/contest";

export const filterContest = (
  contests: Contest[],
  classification: Classification
) => {
  return classification === "All"
    ? contests
    : contests.filter((contest) => contest.classification === classification);
};

export const getProblemIdxes = (contests: Contest[]): string[] => {
  const problemIdxes = contests.reduce((set, contest) => {
    contest.problems.forEach((problem) => {
      set.add(problem.index.replace(/\d/g, ""));
    });
    return set;
  }, new Set<string>());

  return Array.from(problemIdxes).sort();
};
