import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { INTERNAL_API_BASE_URL } from "@constants/url";

export const useAddParticipantToContest = () => {
  const addParticipant = async ({
    contestId,
    userId,
  }: {
    contestId: string;
    userId: string;
  }): Promise<void> => {
    try {
      await axios.post(
        `${INTERNAL_API_BASE_URL}/api/custom-contests/add-user`,
        {
          participant: userId,
          contestId: contestId,
        }
      );
    } catch (error) {
      throw new Error("An error occurred while adding participant.");
    }
  };

  const addParticipantMutation = useMutation<
    void,
    Error,
    { contestId: string; userId: string }
  >(addParticipant);

  const mutate = (contestId: string, userId?: string) => {
    if (!userId) {
      return;
    }
    addParticipantMutation.mutate({ contestId, userId });
  };

  return {
    mutate,
    isAddSuccess: addParticipantMutation.isSuccess,
    isAddError: addParticipantMutation.isError,
  };
};
