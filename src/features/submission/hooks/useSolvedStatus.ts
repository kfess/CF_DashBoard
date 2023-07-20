import { useMemo } from "react";
import { useFetchUserSubmission } from "@features/submission/hooks/useFetchSubmission";
import { QueryParamKeys, useQueryParams } from "@hooks/useQueryParams";
import { getProblemKey } from "@features/problems/utils";

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
        const problemKey = getProblemKey(
          sub.contestId,
          sub.problem.index,
          sub.problem.name
        );
        if (sub.verdict === "OK") {
          solved.add(problemKey);
        }
      });

      data.forEach((sub) => {
        const problemKey = getProblemKey(
          sub.contestId,
          sub.problem.index,
          sub.problem.name
        );
        if (sub.verdict !== "OK" && !solved.has(problemKey)) {
          attempted.add(problemKey);
        }
      });
    }

    return { solvedSet: solved, attemptedSet: attempted };
  }, [data, isError]);

  return { solvedSet, attemptedSet };
};
