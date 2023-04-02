import { useFetchUserSubmission } from "@features/submission/useFetchSubmission";

export const useSolvedStatus = (searchUserId: string) => {
  const { data, isError } = useFetchUserSubmission({
    userId: searchUserId,
  });

  const solvedSet = new Set<string>();
  const attemptedSet = new Set<string>();

  if (!isError && data) {
    data.forEach((sub) => {
      const problemKey = `${sub.contestId}-${sub.problem.index}`;

      if (sub.verdict === "OK") {
        solvedSet.add(problemKey);
      }
    });

    data.forEach((sub) => {
      const problemKey = `${sub.contestId}-${sub.problem.index}`;

      if (sub.verdict !== "OK" && !solvedSet.has(problemKey)) {
        attemptedSet.add(problemKey);
      }
    });
  }

  return { solvedSet, attemptedSet };
};
