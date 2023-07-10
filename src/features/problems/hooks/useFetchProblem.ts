import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { problemsSchema } from "@features/problems/problem";
import type { Problem } from "@features/problems/problem";
import { INTERNAL_API_BASE_URL } from "@constants/url";

const fetchProblems = async (): Promise<Problem[]> => {
  const currentTime = new Date().getTime();
  const problemsCached = localStorage.getItem("problems");
  const problemsCachedTimestamp = localStorage.getItem("problemsTimestamp");

  // キャッシュされたデータが存在し、6 時間以内の場合は、キャッシュされたデータを使用
  if (
    problemsCached &&
    problemsCachedTimestamp &&
    currentTime - parseInt(problemsCachedTimestamp) < 1000 * 60 * 60 * 6
  ) {
    return JSON.parse(problemsCached);
  }

  try {
    const response = await axios.get(`${INTERNAL_API_BASE_URL}/api/problems`);
    const data = problemsSchema.parse(response.data);

    // データを localStorage にキャッシュ
    localStorage.setItem("problems", JSON.stringify(data));
    localStorage.setItem("problemsTimestamp", currentTime.toString());

    return data;
  } catch (error) {
    throw new Error("An Error occurred while fetching problems");
  }
};

export const useFetchProblems = () => {
  const { data, isError, error, isLoading } = useQuery<Problem[], Error>({
    queryKey: ["problems"],
    queryFn: fetchProblems,
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  return { data, isError, error, isLoading };
};
