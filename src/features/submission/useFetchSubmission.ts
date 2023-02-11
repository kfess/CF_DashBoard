import axios from "axios";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import { CF_USER_SUBMISSION_URL } from "@constants/url";
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

export const useFetchUserSubmission = ({ userId }: { userId: string }) => {
  const { data, isError, error, isLoading } = useQuery<Submission[], Error>({
    queryKey: ["user-submissions", userId],
    queryFn: async (): Promise<Submission[]> => {
      try {
        const url = `${CF_USER_SUBMISSION_URL}?handle=${userId}`;
        const response = await axios.get(url);
        const userSubmission = okSubmissionApiSchema.parse(response.data);
        return userSubmission.result;
      } catch (err) {
        if (err instanceof ZodError) {
          throw new Error("validation error");
        }
        throw new Error("user submission error");
      }
    },
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
