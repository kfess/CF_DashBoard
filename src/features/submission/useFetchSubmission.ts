import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { submissionApiSchema } from "@features/submission/submission";
import type { SubmissionAPI } from "@features/submission/submission";

const fetchSubmissions = async (): Promise<SubmissionAPI> => {
  return axios
    .get("/mock/submissions")
    .then((response) => response.data)
    .then((response) => submissionApiSchema.parse(response));
};

export const useFetchSubmissions = ({ searchUser }: { searchUser: string }) => {
  const { data, isError, error, isLoading } = useQuery<SubmissionAPI, Error>({
    queryKey: ["submissions", searchUser],
    queryFn: fetchSubmissions,
  });

  return { data, isError, error, isLoading };
};
