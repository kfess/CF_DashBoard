import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { problemsSchema } from "@features/problems/problem";
import type { Problem } from "@features/problems/problem";

const fetchProblems = async (): Promise<Problem[]> => {
  try {
    const response = await axios.get("http://localhost:4000/problems");
    const data = problemsSchema.parse(response.data);
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
