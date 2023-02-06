import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { contestsSchema } from "@features/contests/contest";
import type { Contest } from "@features/contests/contest";

const fetchContests = async (): Promise<Contest[]> => {
  return axios
    .get("/mock/contests")
    .then((response) => response.data)
    .then((response) => contestsSchema.parse(response));
};

export const useFetchContests = () => {
  const { data, isError, error, isLoading } = useQuery<Contest[], Error>({
    queryKey: ["contests"],
    queryFn: fetchContests,
  });

  const finishedContest = data?.filter((d) => d.phase === "FINISHED");

  return { data, isError, error, isLoading };
};

export const useContestIdNameMap = () => {
  const { data, isError, error, isLoading } = useQuery<Contest[], Error>({
    queryKey: ["contests"],
    queryFn: fetchContests,
  });

  const map = data?.reduce((m, d) => {
    m.set(d.contestId, d.contestName);
    return m;
  }, new Map<number, string>());

  return { map, isError, error, isLoading };
};
