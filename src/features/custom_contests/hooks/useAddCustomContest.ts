import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  CreateCustomContest,
  CustomContest,
} from "@features/custom_contests/customContest";
import { INTERNAL_API_BASE_URL } from "@constants/url";

const addContest = async (
  contest: Omit<CreateCustomContest, "problemsFilter">
): Promise<CustomContest> => {
  try {
    const response = await axios.post(
      `${INTERNAL_API_BASE_URL}/api/custom-contests`,
      contest,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while adding custom contest.");
  }
};

export const useAddCustomContest = () => {
  const addContestMutation = useMutation<
    CustomContest,
    Error,
    Omit<CreateCustomContest, "problemsFilter">
  >((contest: Omit<CreateCustomContest, "problemsFilter">) =>
    addContest(contest)
  );

  const create = async (
    contest: Omit<CreateCustomContest, "problemsFilter">
  ): Promise<CustomContest | undefined> => {
    try {
      const data = await addContestMutation.mutateAsync(contest);
      return data;
    } catch (error) {
      return undefined;
    }
  };

  return {
    create,
    isAddSuccess: addContestMutation.isSuccess,
    isAddError: addContestMutation.isError,
  };
};
