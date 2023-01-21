import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { contestsSchema } from "@features/contests/contest";
import type { Contest } from "@features/contests/contest";

const fetchProblems = async (): Promise<Contest[]> => {
  const url = "/mock/contests";
  const response = await axios.get(url);
  const json = response.data;
  return contestsSchema.parse(json);
};

export const useFetchContests = () => {
    return useQuery<Contest[], Error>(["contests"], fetchProblems);
};
