import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { UserProfile } from "../userProfile";
import { useUserProfile } from "./useUserProfile";

type UseLoginOptions = {
  readonly loginRedirectTo?: string;
  readonly logoutRedirectTo?: string;
};

export const useLoggedIn = ({
  loginRedirectTo = "/",
  logoutRedirectTo = "/",
}: UseLoginOptions = {}) => {
  const { githubId } = useUserProfile();
  const loggedIn = githubId != null;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const login = (info: UserProfile) => {
    queryClient.setQueryData(["userProfile"], info);
    navigate(loginRedirectTo);
  };

  const logout = () => {
    queryClient.removeQueries(["userProfile"]);
    navigate(logoutRedirectTo);
  };

  return { loggedIn, login, logout };
};
