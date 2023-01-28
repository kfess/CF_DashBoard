import type { Contest, Classification } from "@features/contests/contest";

export const filterContest = (
  contests: Contest[],
  classification: Classification,
  reverse: boolean
) => {
  return classification === "All"
    ? contests.sort((a, b) => {
        return reverse
          ? a.startTimeSeconds - b.startTimeSeconds
          : b.startTimeSeconds - a.startTimeSeconds;
      })
    : contests
        .filter((contest) => contest.classification === classification)
        .sort((a, b) => {
          return reverse
            ? a.startTimeSeconds - b.startTimeSeconds
            : b.startTimeSeconds - a.startTimeSeconds;
        });
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
