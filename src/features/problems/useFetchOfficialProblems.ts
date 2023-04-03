import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CF_PROBLEMS_URL } from "@constants/url";
import type { OfficialProblem } from "@features/problems/official_problem";
import { okProblemsApiSchema } from "@features/problems/official_problem";

const fetchOfficialProblems = async (): Promise<OfficialProblem[]> => {
  try {
    const response = await axios.get(CF_PROBLEMS_URL);
    const data = okProblemsApiSchema.parse(response.data);
    return data.result.problems;
  } catch (error) {
    throw new Error("An Error occurred while fetching official problems");
  }
};

export const useFetchOfficialProblems = () => {
  const { data, isError, error, isLoading } = useQuery<
    OfficialProblem[],
    Error
  >({
    queryKey: ["official-problems"],
    queryFn: fetchOfficialProblems,
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  return { data, isError, error, isLoading };
};
