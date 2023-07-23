import dayjs from "dayjs";
import { Problem } from "@features/problems/problem";
import { Submission } from "@features/submission/submission";
import { getProblemKey } from "@features/problems/utils";

// 各問題ごとの AC するまでの時間
// 各問題ごとに AC するまでに WA となった回数
// 各問題ごとに獲得した点数
type ProblemStats = {
  timeToFirstAC: number | null;
  wrongAttemptBeforeAC: number;
  score: number;
};

export type UserStats = {
  problemStats: Record<string, ProblemStats>;
  totalScore: number;
  totalWrongAttempts: number;
  lastACTime: number | null;
  lastACTimeWithPenalty: number | null;
};

const calculateUserStats = (
  submissions: Submission[],
  problems: Problem[],
  startDate: string,
  penalty: number // seconds
): UserStats => {
  const problemStats: Record<string, ProblemStats> = problems.reduce<
    Record<string, ProblemStats>
  >(
    (acc, problem) => ({
      ...acc,
      [`${getProblemKey(problem.contestId, problem.index, problem.name)}`]: {
        timeToFirstAC: null,
        wrongAttemptBeforeAC: 0,
        score: 0,
      },
    }),
    {}
  );

  let totalWrongAttempts = 0;

  submissions.forEach((s) => {
    const key = getProblemKey(s.contestId, s.problem.index, s.problem.name);
    const stats: ProblemStats = problemStats[key];

    const submissionTime = dayjs.unix(s.creationTimeSeconds);
    const relativeSubmissionTime = submissionTime.diff(
      dayjs(startDate),
      "seconds"
    );

    if (s.verdict === "OK" && stats.timeToFirstAC === null) {
      stats.timeToFirstAC = relativeSubmissionTime;
      const problem = problems.find(
        (p) => p.contestId === s.contestId && p.index === s.problem.index
      );
      if (problem) {
        stats.score = problem.rating ?? 0;
      }
    } else {
      if (stats.timeToFirstAC === null) {
        stats.wrongAttemptBeforeAC += 1;
        totalWrongAttempts += 1;
      }
    }
  });

  const totalScore = Object.values(problemStats).reduce(
    (acc, { timeToFirstAC, score }) =>
      acc + (timeToFirstAC !== null ? score : 0),
    0
  );

  const lastACTime =
    Math.max(
      ...Object.values(problemStats).map(
        ({ timeToFirstAC }) => timeToFirstAC || 0
      )
    ) || null;

  const lastACTimeWithPenalty = lastACTime
    ? lastACTime +
      Object.values(problemStats).reduce(
        (acc, { wrongAttemptBeforeAC }) => acc + wrongAttemptBeforeAC * penalty,
        0
      )
    : null;

  return {
    problemStats,
    totalScore,
    totalWrongAttempts,
    lastACTime,
    lastACTimeWithPenalty,
  };
};

export const calculateAllUsersStats = (
  submissionsByUser: Record<string, Submission[]>,
  problems: Problem[],
  startDate: string,
  penalty: number
): Record<string, UserStats> => {
  return Object.entries(submissionsByUser).reduce<Record<string, UserStats>>(
    (acc, [userId, submissions]) => {
      return {
        ...acc,
        [userId]: calculateUserStats(submissions, problems, startDate, penalty),
      };
    },
    {}
  );
};

export const calculateFirstACs = (
  submissions: Submission[],
  startDate: string
): Record<string, { time: number; user: string }> => {
  const firstACs: Record<string, { time: number; user: string }> = {};

  submissions.forEach((s) => {
    const key = getProblemKey(s.contestId, s.problem.index, s.problem.name);

    const submissionTime = dayjs.unix(s.creationTimeSeconds);
    const relativeSubmissionTime = submissionTime.diff(
      dayjs(startDate),
      "seconds"
    );

    if (s.verdict === "OK") {
      if (!firstACs[key] || firstACs[key].time > relativeSubmissionTime) {
        firstACs[key] = {
          time: relativeSubmissionTime,
          user: s.author.members[0].handle,
        };
      }
    }
  });

  return firstACs;
};
