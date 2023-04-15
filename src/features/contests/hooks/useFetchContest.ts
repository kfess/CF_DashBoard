import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { contestsSchema } from "@features/contests/contest";
import type { Contest } from "@features/contests/contest";

const fetchContests = async (): Promise<Contest[]> => {
  const currentTime = new Date().getTime();
  const contestsCached = localStorage.getItem("contests");
  const contestsCachedTimestamp = localStorage.getItem("contestsTimestamp");

  // キャッシュされたデータが存在し、6 時間以内の場合は、キャッシュされたデータを使用
  if (
    contestsCached &&
    contestsCachedTimestamp &&
    currentTime - parseInt(contestsCachedTimestamp) < 1000 * 60 * 60 * 6
  ) {
    return JSON.parse(contestsCached);
  }

  try {
    const response = await axios.get("http://localhost:4000/api/contests");
    const data = contestsSchema.parse(response.data);

    // データを localStorage にキャッシュ
    localStorage.setItem("contests", JSON.stringify(data));
    localStorage.setItem("contestsTimestamp", currentTime.toString());

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("An Error occurred while fetching contests");
  }
};

// codeforces の contest データの更新頻度は低いため、長めの cache を持たせる
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

export const useContestIdNameMap = () => {
  const { data, isError, error, isLoading } = useQuery<Contest[], Error>({
    queryKey: ["contests"],
    queryFn: fetchContests,
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  const contestIdNameMap: Record<number, string> = {};
  data?.forEach((contest) => {
    contestIdNameMap[contest.id] = contest.name;
  });

  return { contestIdNameMap, isError, error, isLoading };
};
