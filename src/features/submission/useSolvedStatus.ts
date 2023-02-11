import { useFetchUserSubmission } from "@features/submission/useFetchSubmission";

export const useSolvedStatus = (searchUserId: string) => {
  const { data, isError } = useFetchUserSubmission({
    userId: searchUserId,
  });

  if (isError) {
    const s = new Set<string>();
    const t = new Set<string>();
    return { s, t };
  }

  // AC
  const solvedSet = data?.reduce((set, sub) => {
    if (sub.verdict === "OK") {
      set.add(sub.contestId + sub.problem.index);
    }
    return set;
  }, new Set<string>());

  // tried solving, but not AC
  const attemptedSet = data?.reduce((set, sub) => {
    if (
      sub.verdict !== "OK" &&
      !solvedSet?.has(sub.contestId + sub.problem.index)
    ) {
      set.add(sub.contestId + sub.problem.index);
    }
    return set;
  }, new Set<string>());

  return { solvedSet, attemptedSet };
};
