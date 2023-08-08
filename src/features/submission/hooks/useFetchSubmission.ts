import axios from "axios";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import type { Submission } from "@features/submission/submission";
import { okSubmissionApiSchema } from "@features/submission/submission";
import {
  CF_USER_SUBMISSION_URL,
  CF_RECENT_SUBMISSION_URL,
} from "@constants/url";
import { isGymSubmission } from "@features/achievement/processSubmission";
import { useCallback } from "react";

const fetchUserSubmissions = async (
  userId: string | null
): Promise<Submission[]> => {
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
};

export const useFetchUserSubmission = ({
  userId,
  excludeGym = true,
}: {
  userId: string | null;
  excludeGym?: boolean;
}) => {
  const { data, isError, error, isLoading } = useQuery<Submission[], Error>({
    queryKey: ["user-submissions", userId, excludeGym],
    queryFn: async (): Promise<Submission[]> => {
      return await fetchUserSubmissions(userId);
    },
    select: useCallback((data: Submission[]) => {
      if (excludeGym) {
        return data.filter((s) => !isGymSubmission(s));
      } else {
        return data;
      }
    }, []),
    enabled: !!userId,
    useErrorBoundary: false, // For now, we don't want to use ErrorBoundary
  });

  return { data: data || [], isError, error, isLoading };
};

const isMockMode = false;
const fetchRecentSubmissions = async (): Promise<Submission[]> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const url = isMockMode
      ? "/mock/submissions"
      : `${CF_RECENT_SUBMISSION_URL}?count=500`;
    const response = await axios.get(url);
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
    refetchInterval: 1000 * 60 * 60 * 1,
    refetchOnWindowFocus: false,
    useErrorBoundary: false, // For now, we don't want to use ErrorBoundary
  });

  return { data, isError, error, isLoading };
};
