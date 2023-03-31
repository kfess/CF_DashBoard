import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { contestsSchema } from "@features/contests/contest";
import type { Contest } from "@features/contests/contest";

const fetchContests = async (): Promise<Contest[]> => {
  try {
    const response = await axios.get("/mock/contests");
    const data = contestsSchema.parse(response.data);
    return data;
  } catch (error) {
    throw new Error("An Error occurred while fetching contests");
  }
};

// codeforces の contest データの更新頻度は低いため、長めの cache を持つ
export const useFetchContests = () => {
  const { data, isError, error, isLoading } = useQuery<Contest[], Error>({
    queryKey: ["contests"],
    queryFn: fetchContests,
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  return { data, isError, error, isLoading };
};

// deprecated
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
