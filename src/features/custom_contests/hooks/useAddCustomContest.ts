import axios from "axios";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";
import { CreateCustomContest } from "@features/custom_contests/customContest";

const addContest = async (
  contest: Omit<CreateCustomContest, "problemsFilter">
): Promise<void> => {
  try {
    await axios.post("http://localhost:4000/api/custom-contests", contest,{
      withCredentials: true,
    });
  } catch (error) {
    throw new Error("An error occurred while adding custom contest.");
  }
};

export const useAddCustomContest = () => {
  const addContestMutation = useMutation<
    void,
    Error,
    Omit<CreateCustomContest, "problemsFilter">
  >(
    (contest: Omit<CreateCustomContest, "problemsFilter">) =>
      addContest(contest),
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

  const create = (contest: Omit<CreateCustomContest, "problemsFilter">) => {
    addContestMutation.mutate(contest);
  };

  return { create };
};
