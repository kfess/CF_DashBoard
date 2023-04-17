import { useMemo } from "react";
import { useFetchUserSubmission } from "@features/submission/hooks/useFetchSubmission";
import { QueryParamKeys, useQueryParams } from "@hooks/useQueryParams";

export const useSolvedStatus = () => {
  const searchUserId = useQueryParams(QueryParamKeys.USERID);
  const { data, isError, isLoading } = useFetchUserSubmission({
    userId: searchUserId,
  });

  const { solvedSet, attemptedSet } = useMemo(() => {
    const solved = new Set<string>();
    const attempted = new Set<string>();

    if (!isError && data) {
      data.forEach((sub) => {
        const problemKey = `${sub.contestId}-${sub.problem.index}`;

        if (sub.verdict === "OK") {
          solved.add(problemKey);
        }
      });

      data.forEach((sub) => {
        const problemKey = `${sub.contestId}-${sub.problem.index}`;

        if (sub.verdict !== "OK" && !solved.has(problemKey)) {
          attempted.add(problemKey);
        }
      });
    }

    return { solvedSet: solved, attemptedSet: attempted };
  }, [data, isError]);

  return { solvedSet, attemptedSet };
};