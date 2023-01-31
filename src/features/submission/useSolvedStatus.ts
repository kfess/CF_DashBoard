import { useRecoilValue } from "recoil";
import { searchUserState } from "@features/layout/searchUser.atom";
import { useFetchSubmissions } from "@features/submission/useFetchSubmission";

export const useSolvedStatus = () => {
  const searchUser = useRecoilValue(searchUserState);
  const { data } = useFetchSubmissions({
    searchUser,
  });

  // AC
  const solvedSet = data?.result?.reduce((set, sub) => {
    if (sub.verdict === "OK") {
      set.add(sub.contestId + sub.problem.index);
    }
    return set;
  }, new Set<string>());

  // tried solving, but not AC
  const attemptedSet = data?.result?.reduce((set, sub) => {
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
