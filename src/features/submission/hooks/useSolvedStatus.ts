import { useMemo } from "react";
import { useFetchUserSubmission } from "@features/submission/hooks/useFetchSubmission";
import { useURLQuery } from "@hooks/useQueryParams";
import { getProblemKey } from "@features/problems/utils";
import { Submission } from "@features/submission/submission";

export const useSolvedStatus = (
  filterFn: (submission: Submission) => boolean = () => true, // filterFn must be inside of useCallback
  userId?: string
) => {
  const { queryParams } = useURLQuery();
  const searchUserId = userId || queryParams["userId"];

  const { data: submissions } = useFetchUserSubmission({
    userId: searchUserId,
  });

  return useMemo(() => {
    const submissionMap = new Map<string, Submission[]>();
    const solvedSet = new Set<string>();
    const attemptedSet = new Set<string>();

    // group all submissions by problem key
    submissions.forEach((sub) => {
      const key = getProblemKey(sub);
      const problemSubmissions = submissionMap.get(key) || [];
      submissionMap.set(key, [...problemSubmissions, sub]);
    });

    // Check whether the problem is solved or not by any submission
    submissionMap.forEach((submissions, key) => {
      if (!submissions.some(filterFn)) {
        return;
      }
      if (submissions.some((s) => s.verdict === "OK")) {
        solvedSet.add(key);
      } else {
        attemptedSet.add(key);
      }
    });

    return { solvedSet, attemptedSet };
  }, [submissions, filterFn]);
};
