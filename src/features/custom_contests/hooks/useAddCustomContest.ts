import axios from "axios";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";
import { CustomContest } from "@features/custom_contests/customContest";

const addContest = async (contest: CustomContest): Promise<void> => {
  try {
    await axios.post("http://localhost:4000/api/custom-contests", contest);
  } catch (error) {
    throw new Error("An error occurred while adding custom contest.");
  }
};

export const useAddCustomContest = () => {
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

  const create = (contest: CustomContest) => {
    addContestMutation.mutate(contest);
  };

  return { create };
};
