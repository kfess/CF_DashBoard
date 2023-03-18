import { useRecoilState } from "recoil";
import type { SessionData } from "@features/authentication/session.atom";
import { sessionDataState } from "@features/authentication/session.atom";

export const useSessionData = () => {
  const [sessionData, setSessionData] = useRecoilState(sessionDataState);

  const setSessionInfo = (info: SessionData | null) => {
    setSessionData(info);
  };

  const clearSessionInfo = () => {
    setSessionData(null);
  };

  return { sessionData, setSessionInfo, clearSessionInfo };
};
