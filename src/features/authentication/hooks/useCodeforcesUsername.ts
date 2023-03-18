import { useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { CF_USER_INFO_URL } from "@constants/url";
import { useSessionData } from "./useSessionData";
import { codeforcesUsernameState } from "@features/authentication/codeforces_username.atom";
import { okUserInfoApiSchema } from "@features/layout/userInfo";

const CODEFORCES_USERNAME_UPDATE_URL = "/mock/user/update";

const updateCodeforcesUsernameIfExists = async (
  codeforcesUsername: string
): Promise<string> => {
  const { sessionData } = useSessionData();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionData?.sessionId}`,
  };
  const body = { codeforcesUsername };

  try {
    // codeforces official API, verify the user really exists.
    const url = `${CF_USER_INFO_URL}?handles=${codeforcesUsername}`;
    const userResponse = await axios.get(url);
    const existUser =
      okUserInfoApiSchema.parse(userResponse.data).status === "OK";

    if (userResponse.status === 404 || !existUser) {
      throw new Error("User does not exist.");
    }

    const response = await axios.post(CODEFORCES_USERNAME_UPDATE_URL, body, {
      headers,
    });
    return response.data;
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

  const mutation = useMutation<string, Error, string>(
    updateCodeforcesUsernameIfExists,
    {
      onSuccess: (codeforcesUsername: string) => {
        setCodeforcesUsername(codeforcesUsername);
      },
      onError: (error) => {
        console.log("An error occurred during updating codeforces username");
        // add Toast in the future
      },
    }
  );

  useEffect(() => {
    return () => {
      mutation.reset();
    };
  }, [mutation]);

  const updateUsername = (codeforcesUsername: string) => {
    mutation.mutate(codeforcesUsername);
  };

  return { codeforcesUsername, updateUsername, isLoading: mutation.isLoading };
};
