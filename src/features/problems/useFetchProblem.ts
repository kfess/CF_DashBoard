import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { problemsSchema } from "@features/problems/problem";
import type { Problem } from "@features/problems/problem";

const fetchProblems = async (): Promise<Problem[]> => {
  const url = "/mock/problems";
  const response = await axios.get(url);
  const json = response.data;
  return problemsSchema.parse(json);
};
export const useFetchProblems = () => {
  return useQuery<Problem[], Error>(["contests"], fetchProblems);
};
