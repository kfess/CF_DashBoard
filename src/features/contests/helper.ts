import type { Problem } from "@features/problems/problem";
import type {
  Contest,
  Classification,
  ReshapedContest,
} from "@features/contests/contest";
import { groupBy } from "@helpers/index";

export const reshapeContests = (
  contests: Contest[],
  classification: Classification,
  reverse: boolean
): ReshapedContest[] => {
  const reshapedContests = contests.map((contest) => {
    const reshapedProblems = groupBy(contest.problems, (problem: Problem) =>
      problem.index.replace(/[0-9]/g, "")
    ).map((indexedProblems) => {
      return {
        index: indexedProblems[0],
        indexedProblems: indexedProblems[1],
      };
    });
    return { ...contest, problems: reshapedProblems };
  });

  return classification === "All"
    ? reshapedContests.sort((a, b) => {
        return reverse
          ? a.startTimeSeconds - b.startTimeSeconds
          : b.startTimeSeconds - a.startTimeSeconds;
      })
    : reshapedContests
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
