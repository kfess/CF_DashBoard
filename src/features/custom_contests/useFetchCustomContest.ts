import axios from "axios";
import { ZodError } from "zod";
import { useNavigate } from "react-router-dom";
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
        const url = `/mock/custom-contest/${contestId}`;
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
    enabled: !!userId,
  });
};
