import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { contestsSchema } from "@features/contests/contest";
import type { Contest } from "@features/contests/contest";

const fetchProblems = async (): Promise<Contest[]> => {
  return axios
    .get("/mock/contests")
    .then((response) => response.data)
    .then((response) => contestsSchema.parse(response));
};

export const useFetchContests = () => {
  return useQuery<Contest[], Error>({
    queryKey: ["contests"],
    queryFn: fetchProblems,
  });
};
