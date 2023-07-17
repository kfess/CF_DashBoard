import axios, { AxiosError } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CF_USER_INFO_URL, INTERNAL_API_BASE_URL } from "@constants/url";
import { okUserInfoApiSchema } from "@features/layout/userInfo";
import { userProfileSchema } from "@features/authentication/userProfile";
import type { UserProfile } from "@features/authentication/userProfile";

const INTERNAL_CF_GET_URL = `${INTERNAL_API_BASE_URL}/api/users/find`;
const INTERNAL_CF_UPDATE_URL = `${INTERNAL_API_BASE_URL}/api/users/update`;

const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await axios.get(INTERNAL_CF_GET_URL, {
      withCredentials: true,
    });
    const data = userProfileSchema.parse(response.data);
    return data;
  } catch (error) {
    console.log(error);
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

export const useUserProfile = () => {
  const queryClient = useQueryClient();

  // fetch user profile data
  const { data, isLoading, isError } = useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    retry: false,
    useErrorBoundary: false, // For now, we don't want to use ErrorBoundary
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

  const updateUsername = async (codeforcesUsername: string) => {
    const pattern = /^[a-zA-Z0-9_]+$/;
    const isValidUsername = pattern.test(codeforcesUsername);
    if (!!codeforcesUsername && isValidUsername) {
      await updateUsernameMutation.mutateAsync(codeforcesUsername);
    }
  };

  return {
    githubId: data?.githubId,
    githubUserName: data?.githubUsername,
    codeforcesUsername: data?.codeforcesUsername,
    updateUsername,
  };
};
