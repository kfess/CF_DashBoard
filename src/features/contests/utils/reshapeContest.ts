import dayjs from "dayjs";
import type { Problem } from "@features/problems/problem";
import type {
  Contest,
  Classification,
  ReshapedContest,
} from "@features/contests/contest";
import { groupBy } from "@helpers/arr-utils";
import {
  PeriodWord,
  periodFilter,
} from "@features/contests/components/PeriodFilter";
import { normalizeProblemIndex } from "@features/contests/utils/problemIdxes";
import { SolvedStatus } from "@features/contests/components/SolvedStatusFilter";
import { calcSolvedStatus } from "@features/contests/utils/solvedStatus";

export const filterAndSortContests = (
  contests: Contest[],
  classification: Classification,
  reverse: boolean,
  period: PeriodWord,
  solvedStatus: SolvedStatus,
  solvedSet?: Set<string> | undefined,
  userId?: string
): Contest[] => {
  return contests
    .filter((contest) => {
      const isFinished = contest.phase !== "BEFORE";
      const isClassificationMatch =
        classification === "All" || contest.classification === classification;
      const isAfterPeriodStart = dayjs
        .unix(contest.startTimeSeconds)
        .isAfter(periodFilter[period].from);
      const isSolvedStatusMatch =
        solvedStatus === "All Contests" ||
        (userId && calcSolvedStatus(contest, solvedSet) === solvedStatus);

      return (
        isFinished &&
        isClassificationMatch &&
        isAfterPeriodStart &&
        isSolvedStatusMatch
      );
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
  period: PeriodWord,
  solvedStatus: SolvedStatus,
  solvedSet?: Set<string> | undefined,
  userId?: string
): ReshapedContest[] => {
  const filteredAndSortedContests = filterAndSortContests(
    contests,
    classification,
    reverse,
    period,
    solvedStatus,
    solvedSet,
    userId
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
