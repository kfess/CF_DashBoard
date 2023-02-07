import axios from "axios";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import { submissionApiSchema } from "@features/submission/submission";
import type {
  Submission,
  SubmissionAPI,
} from "@features/submission/submission";
import { okSubmissionApiSchema } from "@features/submission/submission";

const isMockMode = false;
const submissionUrl = isMockMode ? "/mock/submissions" : "";
const recentSubmissionUrl = isMockMode
  ? "/mock/submissions"
  : "https://codeforces.com/api/problemset.recentStatus?count=500";

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
    await new Promise((resolve) => setTimeout(resolve, 300));
    const response = await axios.get(recentSubmissionUrl);
    const recentSubmission = okSubmissionApiSchema.parse(response.data);
    return recentSubmission.result;
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
    }
    return [];
  }
};

export const useFetchRecentSubmissions = () => {
  const { data, isError, error, isLoading } = useQuery<Submission[], Error>({
    queryKey: ["recent-submissions"],
    queryFn: fetchRecentSubmissions,
    refetchInterval: 1000 * 60 * 60,
  });

  return { data, isError, error, isLoading };
};
