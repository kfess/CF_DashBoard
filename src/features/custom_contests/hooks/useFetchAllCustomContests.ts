import axios from "axios";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import {
  CustomContest,
  customContestsSchema,
} from "@features/custom_contests/customContest";

const fetchAllCustomContests = async (): Promise<CustomContest[]> => {
  try {
    const url = "http://localhost:4000/api/custom-contests/all-contests";
    const response = await axios.get(url, { withCredentials: true });
    const allCustomContests = customContestsSchema.parse(response.data);
    return allCustomContests;
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
      throw new Error("validation error");
    }
    throw new Error("custom contest error");
  }
};

export const useFetchAllCustomContests = () => {
  const { data, isError, error, isLoading } = useQuery<CustomContest[], Error>({
    queryKey: ["all-custom-contests"],
    queryFn: fetchAllCustomContests,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
  });

  return { data, isError, error, isLoading };
};
