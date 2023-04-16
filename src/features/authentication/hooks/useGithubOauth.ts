import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SessionData } from "@features/authentication/session.atom";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";

const AUTHENTICATE_URL = "http://localhost:4000/api/users/exchange";

const exchangeCodeForSession = async ({
  code,
  state,
}: {
  code: string | null;
  state: string | null;
}): Promise<SessionData> => {
  try {
    if (!state || !code || state.trim() === "" || code.trim() === "") {
      throw new Error("Invalid state or code!");
    }
    const originalState = localStorage.getItem("github_oauth_state");
    if (originalState !== state) {
      throw new Error("Mismatched state!");
    }

    const response = await axios.post<SessionData>(
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

  const onSuccess = (sessionData: SessionData) => {
    login(sessionData);
  };

  const onError = (error: Error) => {
    console.error("An error occurred during the GitHub OAuth process:", error);
    navigate("/");
  };

  const mutation = useMutation<
    SessionData,
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
