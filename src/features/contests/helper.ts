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
          contest.problems.map((problem) => problem.index.replace(/\d/g, ""))
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
        contest.problems.map((problem) => problem.index.replace(/\d/g, ""))
      )
    )
  );
  return getSortedIdxes(idxes);
};
