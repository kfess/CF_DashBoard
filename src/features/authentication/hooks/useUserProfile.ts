import axios, { AxiosError } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CF_USER_INFO_URL } from "@constants/url";
import { okUserInfoApiSchema } from "@features/layout/userInfo";
import { userProfileSchema } from "@features/authentication/userProfile";
import type { UserProfile } from "@features/authentication/userProfile";
import type { CustomContest } from "@features/custom_contests/customContest";

const INTERNAL_CF_GET_URL = "/mock/user/get";
const INTERNAL_CF_UPDATE_URL = "http://localhost:4000/api/users/update";
const INTERNAL_ADD_OWNED_CONTEST_URL = "/mock/user/ownedContests/add";
const INTERNAL_ADD_JOINED_CONTEST_URL = "/mock/user/joinedContests/add";

const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axios.get(INTERNAL_CF_GET_URL);
    const data = userProfileSchema.parse(response.data);
    return data;
  } catch (error) {
    throw new Error("An error occurred while fetching user profile data");
  }
};

const updateCodeforcesUsernameIfExists = async (
  codeforcesUsername: string
): Promise<void> => {
  // codeforces official API, verify the user really exists.
  try {
    const userResponse = await axios.get(
      `${CF_USER_INFO_URL}?handles=${codeforcesUsername}`
    );
    const existUser =
      okUserInfoApiSchema.parse(userResponse.data).status === "OK";

    if (!existUser) {
      throw new Error("User does not exist.");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }

  try {
    await axios.put(
      INTERNAL_CF_UPDATE_URL,
      { codeforcesUsername },
      { withCredentials: true }
    );
  } catch (error) {
    throw new Error(
      "An error occurred while updating the codeforces username."
    );
  }
};

const addJoinedCustomContest = async (
  contest: CustomContest
): Promise<void> => {
  try {
    await axios.post(INTERNAL_ADD_JOINED_CONTEST_URL, contest);
  } catch (error) {
    throw new Error(
      "An error occurred while adding the joined custom contest."
    );
  }
};

const addOwnedCustomContest = async (contest: CustomContest): Promise<void> => {
  try {
    await axios.post(INTERNAL_ADD_OWNED_CONTEST_URL, contest);
  } catch (error) {
    throw new Error("An error occurred while adding the owned custom contest.");
  }
};

export const useUserProfile = () => {
  const queryClient = useQueryClient();

  // fetch user profile data
  const { data, isLoading, isError } = useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  // mutate user codeforces username
  const updateUsernameMutation = useMutation<void, Error, string>(
    (codeforcesUsername: string) =>
      updateCodeforcesUsernameIfExists(codeforcesUsername),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userProfile"]); // update usename immediately
      },
      onError: (error) => {
        console.log("An error occurred during updating codeforces username");
        // add Toast in the future
      },
      retry: false,
    }
  );

  // mutate ownedCustomContests
  const addOwnedContestMutation = useMutation<void, Error, CustomContest>(
    (contest: CustomContest) => addOwnedCustomContest(contest),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userProfile"]); // update contests immediately
      },
      onError: (error) => {
        console.log("An error occurred during adding owned custom contest");
        // add Toast in the future
      },
    }
  );

  // mutate joinedCustomContests
  const addJoinedContestMutation = useMutation<void, Error, CustomContest>(
    (contest: CustomContest) => addJoinedCustomContest(contest),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userProfile"]); // update contests immediately
      },
      onError: (error) => {
        console.log("An error occurred during adding joined custom contest");
        // add Toast in the future
      },
    }
  );

  const updateUsername = async (codeforcesUsername: string) => {
    const pattern = /^[a-zA-Z0-9_]+$/;
    const isValidUsername = pattern.test(codeforcesUsername);
    if (!!codeforcesUsername && isValidUsername) {
      await updateUsernameMutation.mutateAsync(codeforcesUsername);
    }
  };

  const addOwnedContest = async (contest: CustomContest) => {
    await addOwnedContestMutation.mutateAsync(contest);
  };

  const addJoinedContest = async (contest: CustomContest) => {
    await addJoinedContestMutation.mutateAsync(contest);
  };

  return {
    githubId: data?.userId,
    githubUserName: data?.userName,
    codeforcesUsername: data?.codeforcesUsername,
    updateUsername,
    addOwnedContest,
    addJoinedContest,
  };
};
