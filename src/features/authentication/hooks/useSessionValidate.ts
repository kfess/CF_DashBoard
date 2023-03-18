import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { SessionData } from "@features/authentication/session.atom";
import { useSessionData } from "@features/authentication/hooks/useSessionData";

const SESSION_VALIDATION_URL = "/mock/validate-session";

const validateSession = async (
  sessionId: string | null | undefined
): Promise<SessionData> => {
  if (!sessionId) {
    return Promise.reject(new Error("No session Id available"));
  }
  const response = await axios.get<SessionData>(SESSION_VALIDATION_URL, {
    headers: { Authorization: `Bearer ${sessionId}` },
  });
  return response.data;
};

export const useSessionValidation = () => {
  const { sessionData, setSessionInfo, clearSessionInfo } = useSessionData();
  const sessionId = sessionData?.sessionId;

  useQuery<SessionData, Error>({
    queryKey: ["sessionValidation", sessionId],
    queryFn: () => validateSession(sessionId),
    enabled: !!sessionId, // When logged out, the request is not enabled.
    onSuccess: (data) => {
      setSessionInfo(data);
    },
    onError: () => {
      clearSessionInfo();
    },
    refetchOnWindowFocus: false,
  });
};
