import axios from "axios";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import {
  CustomContest,
  customContestsSchema,
} from "@features/custom_contests/customContest";

export const useFetchPublicCustomContests = () => {
  const { data, isError, error, isLoading } = useQuery<CustomContest[], Error>({
    queryKey: ["public-custom-contests"],
    queryFn: async (): Promise<CustomContest[]> => {
      try {
        const url = "/mock/customcontest/public";
        const response = await axios.get(url);
        const publicCustomContests = customContestsSchema.parse(response.data);
        return publicCustomContests;
      } catch (err) {
        if (err instanceof ZodError) {
          throw new Error("validation error");
        }
        throw new Error("custom contest error");
      }
    },
  });

  return { data, isError, error, isLoading };
};
