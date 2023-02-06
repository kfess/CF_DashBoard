import axios, { AxiosError, AxiosResponse } from "axios";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import { submissionApiSchema } from "@features/submission/submission";
import type {
  Submission,
  SubmissionAPI,
} from "@features/submission/submission";
import { okSubmissionApiSchema } from "@features/submission/submission";

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

const fetchRecentSubmissions = async (): Promise<Submission[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await axios.get("/mock/submissions");
    const recentSubmission = okSubmissionApiSchema.parse(response.data);
    console.log("response:", response);
    console.log("recentSubmission:", recentSubmission);

    return recentSubmission.result;
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
    }
    console.log(err);
    return [];
  }
};

export const useFetchRecentSubmissions = () => {
  const { data, isError, error, isLoading } = useQuery<Submission[], Error>({
    queryKey: ["recent-submissions"],
    queryFn: fetchRecentSubmissions,
  });

  return { data, isError, error, isLoading };
};
