import { useRecoilState } from "recoil";
import type { SessionData } from "@features/authentication/session.atom";
import { seissionDataState } from "@features/authentication/session.atom";

export const useSessionData = () => {
  const [sessionData, setSessionData] = useRecoilState(seissionDataState);

  const setSessionInfo = (info: SessionData | null) => {
    setSessionData(info);
  };

  const clearSessionInfo = () => {
    setSessionData(null);
  };

  return { sessionData, setSessionInfo, clearSessionInfo };
};
