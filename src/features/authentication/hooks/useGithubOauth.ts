import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { UserProfile } from "@features/authentication/userProfile";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";

const AUTHENTICATE_URL = "http://localhost:4000/api/users/exchange";

const exchangeCodeForSession = async ({
  code,
  state,
}: {
  code: string | null;
  state: string | null;
}): Promise<UserProfile> => {
  try {
    if (!state || !code || state.trim() === "" || code.trim() === "") {
      throw new Error("Invalid state or code!");
    }
    const originalState = localStorage.getItem("github_oauth_state");
    if (originalState !== state) {
      throw new Error("Mismatched state!");
    }

    const response = await axios.post<UserProfile>(
      AUTHENTICATE_URL,
      { code },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to exchange code for session");
  }
};

export const useGithubOauth = () => {
  const navigate = useNavigate();
  const { login } = useLoggedIn();

  const onSuccess = (userProfile: UserProfile) => {
    login(userProfile);
  };

  const onError = (error: Error) => {
    console.error("An error occurred during the GitHub OAuth process:", error);
    navigate("/");
  };

  const mutation = useMutation<
    UserProfile,
    Error,
    { code: string | null; state: string | null }
  >(exchangeCodeForSession, {
    onSuccess,
    onError,
  });

  return {
    ...mutation,
  };
};
