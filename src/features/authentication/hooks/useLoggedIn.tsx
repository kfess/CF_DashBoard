import { useNavigate } from "react-router-dom";
import { useSessionData } from "@features/authentication/hooks/useSessionData";
import { SessionData } from "../session.atom";

type UseLoginOptions = {
  readonly loginRedirectTo?: string;
  readonly logoutRedirectTo?: string;
};

export const useLoggedIn = ({
  loginRedirectTo = "/",
  logoutRedirectTo = "/",
}: UseLoginOptions = {}) => {
  const { sessionData, setSessionInfo, clearSessionInfo } = useSessionData();

  const loggedIn = sessionData?.sessionId !== null;
  const navigate = useNavigate();

  const login = (info: SessionData) => {
    setSessionInfo(info);
    navigate(loginRedirectTo);
  };

  const logout = () => {
    clearSessionInfo();
    navigate(logoutRedirectTo);
  };

  return { loggedIn, login, logout };
};
