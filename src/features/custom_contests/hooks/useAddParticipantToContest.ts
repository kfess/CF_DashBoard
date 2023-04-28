import axios from "axios";
import { ZodError } from "zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const useAddParticipantToContest = () => {
  const navigate = useNavigate();

  const addParticipant = async ({
    contestId,
    userId,
  }: {
    contestId: string;
    userId: string;
  }): Promise<void> => {
    try {
      await axios.post("http://localhost:4000/api/custom-contests/add-user", {
        participant: userId,
        contestId: contestId,
      });
    } catch (error) {
      throw new Error("An error occurred while adding participant.");
    }
  };

  const addParticipantMutation = useMutation<
    void,
    Error,
    {
      contestId: string;
      userId: string;
    }
  >(addParticipant, {
    onSuccess: () => {
      console.log("Successfully added participant");
      navigate("/custom-contest");
    },
    onError: (error) => {
      console.log("An error occurred while adding participant.");
      // add user notification
    },
  });

  const mutate = (contestId: string, userId?: string) => {
    if (!userId) {
      return;
    }
    addParticipantMutation.mutate({ contestId, userId });
  };

  return { mutate };
};
