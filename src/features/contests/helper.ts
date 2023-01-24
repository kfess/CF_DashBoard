import type { Contest, Classification } from "@features/contests/contest";

export const filterContest = (
  contests: Contest[],
  classification: Classification
) => {
  return classification === "All"
    ? contests
    : contests.filter((contest) => contest.classification === classification);
};
