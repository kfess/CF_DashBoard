import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilUserProfile } from "@features/authentication/hooks/useRecoilUserProfile";
import type { UserProfile } from "../userProfile";

type UseLoginOptions = {
  readonly loginRedirectTo?: string;
  readonly logoutRedirectTo?: string;
};

export const useLoggedIn = ({
  loginRedirectTo = "/",
  logoutRedirectTo = "/",
}: UseLoginOptions = {}) => {
  const { userProfile, setUserProfileInfo, clearUserProfile } =
    useRecoilUserProfile();

  const loggedIn = userProfile !== null;
  const navigate = useNavigate();

  const login = (info: UserProfile) => {
    setUserProfileInfo(info);
    navigate(loginRedirectTo);
  };

  const logout = () => {
    clearUserProfile();
    navigate(logoutRedirectTo);
  };

  return { loggedIn, login, logout };
};
