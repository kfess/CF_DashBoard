import React from "react";
import { useSessionData } from "@features/authentication/hooks/useSessionData";
import { useCodeforcesUsername } from "@features/authentication/hooks/useCodeforcesUsername";

export const Profile: React.FC = () => {
  const { sessionData } = useSessionData();
  const { codeforcesUsername } = useCodeforcesUsername();

  return <></>;
};
