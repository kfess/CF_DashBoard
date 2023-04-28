import axios from "axios";
import { ZodError } from "zod";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  CustomContest,
} from "@features/custom_contests/customContest";

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
      await axios.put(`/mock/custom-contest/${contestId}/participants`, {
        userId,
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

export const useHasUserRegistered = (contestId: string, userId?: string) => {
  const fetchUserRegistration = async () => {
    try {
      const response = await axios.get(
        `/mock/custom-contest/${contestId}/has-user-registered`,
        { params: { userId: userId } }
      );
      return response.data.hasUserRegistered;
    } catch (error) {
      throw new Error("An error occurred while checking user registration");
    }
  };

  return useQuery<boolean, Error>({
    queryKey: ["userRegistration", contestId, userId],
    queryFn: fetchUserRegistration,
    enabled: !!userId && !!contestId,
    initialData: false,
  });
};
