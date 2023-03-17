import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type SessionData = {
  readonly sessionId: string;
  readonly user: {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly avatarUrl: string;
  };
};

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
      "/api/auth/github/callback",
      { code, state }
    );

    return response.data;
  } catch (error) {
    console.error("An error occurred during the GitHub OAuth process:", error);
    throw new Error("Failed to exchange code for session");
  }
};

export const useGithubOauth = () => {
  const navigate = useNavigate();

  const onSuccess = (sessionData: SessionData) => {
    localStorage.setItem("session_id", sessionData.sessionId);
    console.log(sessionData);
    navigate("/");
  };

  const onError = (error: Error) => {
    console.error("An error occurred during the GitHub OAuth process:", error);
    navigate(-1);
  };

  const mutation = useMutation<
    SessionData,
    Error,
    { code: string | null; state: string | null }
  >(exchangeCodeForSession, {
    onSuccess,
    onError: onError,
  });

  return {
    ...mutation,
  };
};
