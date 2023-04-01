import type { Problem } from "@features/problems/problem";
import type {
  Contest,
  Classification,
  ReshapedContest,
} from "@features/contests/contest";
import { groupBy } from "@helpers/index";

export const reshapeProblems = (problems: Problem[]) => {
  const groupedProblems = groupBy(problems, (problem) =>
    problem.index.replace(/[0-9]/g, "")
  );

  return groupedProblems.map(([index, indexedProblems]) => ({
    index,
    indexedProblems,
  }));
};

const filterAndSortContests = (
  contests: Contest[],
  classification: Classification,
  reverse: boolean
): Contest[] => {
  const filteredContests =
    classification === "All"
      ? contests
      : contests.filter((contest) => contest.classification === classification);

  return filteredContests.sort((a, b) =>
    reverse
      ? a.startTimeSeconds - b.startTimeSeconds
      : b.startTimeSeconds - a.startTimeSeconds
  );
};

export const reshapeContests = (
  contests: Contest[],
  classification: Classification,
  reverse: boolean
): ReshapedContest[] => {
  const filteredAndSortedContests = filterAndSortContests(
    contests,
    classification,
    reverse
  );

  return filteredAndSortedContests.map((contest) => {
    const reshapedProblems = groupBy(contest.problems, (problem: Problem) =>
      problem.index.replace(/[0-9]/g, "")
    ).map(([index, indexedProblems]) => {
      return {
        index,
        indexedProblems,
      };
    });

    return { ...contest, problems: reshapedProblems } as ReshapedContest;
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
