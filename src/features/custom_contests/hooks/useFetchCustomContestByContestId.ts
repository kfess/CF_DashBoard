import axios from "axios";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import {
  CustomContest,
  customContestSchema,
} from "@features/custom_contests/customContest";

const fetchCustomContestByContestId = async ({
  contestId,
}: {
  contestId: string;
}): Promise<CustomContest> => {
  try {
    const url = `http://localhost:4000/api/custom-contests/${contestId}`;
    const response = await axios.get(url);
    const contest = customContestSchema.parse(response.data);
    return contest;
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
      throw new Error("validation error");
    }
    throw new Error("custom contest error");
  }
};

export const useFetchCustomContestByContestId = ({
  contestId,
}: {
  contestId: string;
}) => {
  const { data, isError, error, isLoading } = useQuery<CustomContest, Error>({
    queryKey: ["public-custom-contest", contestId],
    queryFn: () => fetchCustomContestByContestId({ contestId }),
    enabled: !!contestId,
    retry: 0,
  });

  return { data, isError, error, isLoading };
};
