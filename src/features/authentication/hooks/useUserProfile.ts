import axios, { AxiosError } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CF_USER_INFO_URL } from "@constants/url";
import { okUserInfoApiSchema } from "@features/layout/userInfo";
import {
  UserProfile,
  userProfileSchema,
} from "@features/authentication/userProfile";

const INTERNAL_CF_GET_URL = "/mock/user/get";
const INTERNAL_CF_UPDATE_URL = "/mock/user/update";

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
): Promise<string | null> => {
  const body = { codeforcesUsername };

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
    await axios.post(INTERNAL_CF_UPDATE_URL, body);
    return codeforcesUsername;
  } catch (error) {
    throw new Error(
      "An error occurred while updating the codeforces username."
    );
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
  const mutation = useMutation<string | null, Error, string>(
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
    }
  );

  const updateUsername = async (codeforcesUsername: string) => {
    const pattern = /^[a-zA-Z0-9_]+$/;
    const isValidUsername = pattern.test(codeforcesUsername);
    if (!!codeforcesUsername && isValidUsername) {
      await mutation.mutateAsync(codeforcesUsername);
    }
  };

  return {
    githubId: data?.userId,
    githubUserName: data?.userName,
    codeforcesUsername: data?.codeforcesUsername,
    updateUsername,
  };
};
