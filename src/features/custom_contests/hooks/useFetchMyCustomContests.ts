import axios from "axios";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import {
  myCustomContestsSchema,
  MyCustomContests,
} from "@features/custom_contests/customContest";
import { INTERNAL_API_BASE_URL } from "@constants/url";

const fetchMyCustomContests = async (): Promise<MyCustomContests> => {
  try {
    const url = `${INTERNAL_API_BASE_URL}/api/custom-contests/my-contests`;
    const response = await axios.get(url, { withCredentials: true });
    const myCustomContests = myCustomContestsSchema.parse(response.data);
    return myCustomContests;
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error("validation error");
    }
    throw new Error("custom contest error");
  }
};

export const useFetchMyCustomContests = () => {
  const { data, isError, error, isLoading } = useQuery<MyCustomContests, Error>(
    {
      queryKey: ["my-custom-contests"],
      queryFn: fetchMyCustomContests,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 3,
      staleTime: 1000 * 60 * 60, // 60 minutes
    }
  );

  return { data, isError, error, isLoading };
};
