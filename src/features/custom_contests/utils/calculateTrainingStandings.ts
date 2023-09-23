import type { Submission } from "@features/submission/submission";
import { getProblemKey } from "@features/problems/utils";

type UserStats = {
  totalScore: number;
  solvedSet: Set<string>;
  attemptedSet: Set<string>;
};

const calculateUserStats = (submissions: Submission[]): UserStats => {
  let totalScore = 0;
  const solvedSet = new Set<string>();
  const attemptedSet = new Set<string>();

  submissions.forEach((s) => {
    if (s.verdict === "OK" && !solvedSet.has(getProblemKey(s))) {
      solvedSet.add(getProblemKey(s));
      totalScore += 1;
    }
  });

  submissions.forEach((s) => {
    if (s.verdict === "OK") {
      return;
    }
    if (solvedSet.has(getProblemKey(s))) {
      return;
    }
    attemptedSet.add(getProblemKey(s));
  });

  return {
    totalScore,
    solvedSet,
    attemptedSet,
  };
};

export const calculateAllUsersStats = (
  submissionsByUser: Record<string, Submission[]>
): Record<string, UserStats> => {
  return Object.entries(submissionsByUser).reduce<Record<string, UserStats>>(
    (acc, [userId, submissions]) => {
      return {
        ...acc,
        [userId]: calculateUserStats(submissions),
      };
    },
    {}
  );
};
