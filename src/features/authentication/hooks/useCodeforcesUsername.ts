import { useRecoilState } from "recoil";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { CF_USER_INFO_URL } from "@constants/url";
import { useSessionData } from "./useSessionData";
import { codeforcesUsernameState } from "@features/authentication/codeforces_username.atom";
import { okUserInfoApiSchema } from "@features/layout/userInfo";
import type { SessionData } from "@features/authentication/session.atom";

const updateCodeforcesUsernameIfExists = async (
  codeforcesUsername: string,
  sessionData: SessionData | null
): Promise<void> => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionData?.sessionId}`,
  };
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
    await axios.post("/mock/user/update", body, { headers });
  } catch (error) {
    throw new Error(
      "An error occurred while updating the codeforces username."
    );
  }
};

export const useCodeforcesUsername = () => {
  const [codeforcesUsername, setCodeforcesUsername] = useRecoilState(
    codeforcesUsernameState
  );
  const { sessionData } = useSessionData();

  const mutation = useMutation<void, Error, string>(
    (codeforcesUsername: string) =>
      updateCodeforcesUsernameIfExists(codeforcesUsername, sessionData),
    {
      onError: (error) => {
        console.log("An error occurred during updating codeforces username");
        // add Toast in the future
      },
    }
  );

  const updateUsername = async (codeforcesUsername: string) => {
    if (!!codeforcesUsername) {
      await mutation.mutateAsync(codeforcesUsername);
      setCodeforcesUsername(codeforcesUsername);
    }
  };

  return { codeforcesUsername, updateUsername, isLoading: mutation.isLoading };
};
