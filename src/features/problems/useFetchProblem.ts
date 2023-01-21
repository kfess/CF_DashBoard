import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { problemsSchema } from "@features/problems/problem";
import type { Problem } from "@features/problems/problem";

const fetchProblems = async (): Promise<Problem[]> => {
  return axios
    .get("/mock/problems")
    .then((response) => response.data)
    .then((response) => problemsSchema.parse(response));
};

export const useFetchProblems = () => {
  return useQuery<Problem[], Error>({
    queryKey: ["contests"],
    queryFn: fetchProblems,
  });
};
