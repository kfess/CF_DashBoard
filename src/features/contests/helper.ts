import dayjs from "dayjs";
import type { Problem } from "@features/problems/problem";
import type {
  Contest,
  Classification,
  ReshapedContest,
} from "@features/contests/contest";
import { groupBy } from "@helpers/arr-utils";
import { PeriodWord, periodFilter } from "./components/PeriodFilter";
import { normalizeProblemIndex } from "@features/contests/utils/problemIdxes";

const filterAndSortContests = (
  contests: Contest[],
  classification: Classification,
  reverse: boolean,
  period: PeriodWord
): Contest[] => {
  return contests
    .filter((contest) => {
      const isFinished = contest.phase !== "BEFORE";
      const isClassificationMatch =
        classification === "All" || contest.classification === classification;
      const isAfterPeriodStart = dayjs
        .unix(contest.startTimeSeconds)
        .isAfter(periodFilter[period].from);
      return isFinished && isClassificationMatch && isAfterPeriodStart;
    })
    .sort((a, b) =>
      reverse
        ? a.startTimeSeconds - b.startTimeSeconds
        : b.startTimeSeconds - a.startTimeSeconds
    );
};

export const reshapeContests = (
  contests: Contest[],
  classification: Classification,
  reverse: boolean,
  period: PeriodWord
): ReshapedContest[] => {
  const filteredAndSortedContests = filterAndSortContests(
    contests,
    classification,
    reverse,
    period
  );

  return filteredAndSortedContests.map((contest) => {
    const reshapedProblems = groupBy(contest.problems, (problem: Problem) =>
      normalizeProblemIndex(problem.index)
    ).map(([index, indexedProblems]) => {
      return {
        index,
        indexedProblems,
      };
    });

    return { ...contest, problems: reshapedProblems } as ReshapedContest;
  });
};
