import type { Contest, Classification } from "@features/contests/contest";

export const filterContest = (
  contests: Contest[],
  classification: Classification,
  reverse: boolean
) => {
  if (reverse) {
    return classification === "All"
      ? contests.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
      : contests
          .filter((contest) => contest.classification === classification)
          .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);
  } else {
    return classification === "All"
      ? contests
      : contests.filter((contest) => contest.classification === classification);
  }
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
