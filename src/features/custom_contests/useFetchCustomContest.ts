import axios from "axios";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import {
  CustomContest,
  customContestSchema,
  customContestsSchema,
} from "@features/custom_contests/customContest";

export const useFetchPublicCustomContests = () => {
  const { data, isError, error, isLoading } = useQuery<CustomContest[], Error>({
    queryKey: ["public-custom-contests"],
    queryFn: async (): Promise<CustomContest[]> => {
      try {
        const url = "/mock/custom-contest/contests";
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

export const useFetchPublicCustomContest = ({
  contestId,
}: {
  contestId: string;
}) => {
  const { data, isError, error, isLoading } = useQuery<CustomContest, Error>({
    queryKey: ["public-custom-contest"],
    queryFn: async (): Promise<CustomContest> => {
      try {
        const url = "/mock/custom-contest/public/random-uuid";
        const response = await axios.get(url);
        const publicCustomContest = customContestSchema.parse(response.data);
        return publicCustomContest;
      } catch (err) {
        if (err instanceof ZodError) {
          console.log(err);
          throw new Error("validation error");
        }
        throw new Error("custom contest error");
      }
    },
    enabled: !!contestId,
  });

  return { data, isError, error, isLoading };
};

export const useAddCustomContest = () => {};
