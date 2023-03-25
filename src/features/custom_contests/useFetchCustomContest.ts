import axios from "axios";
import { ZodError } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
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
        const url = "/mock/custom-contest/contests?filter=public";
        const response = await axios.get(url);
        const publicCustomContests = customContestsSchema.parse(response.data);
        return publicCustomContests;
      } catch (err) {
        if (err instanceof ZodError) {
          console.log(err);
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

export const useAddCustomContest = () => {
  const addContest = async (contest: CustomContest): Promise<void> => {
    try {
      await axios.post("/mock/custom-contest/contests", contest);
    } catch (error) {
      throw new Error("An error occurred while adding custom contest.");
    }
  };

  const addContestMutation = useMutation<void, Error, CustomContest>(
    (contest: CustomContest) => addContest(contest),
    {
      onSuccess: () => {
        console.log("successfully added contest");
      },
      onError: (error) => {
        console.log("An error occurred while adding custom contest.");
        // add user notification
      },
    }
  );

  const mutate = (contest: CustomContest) => {
    addContestMutation.mutate(contest);
  };

  return { mutate };
};
