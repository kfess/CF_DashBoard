import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "@features/authentication/userProfile";
import { userProfileState } from "@features/authentication/userProfile.atom";

type UseLoginOptions = {
  readonly loginRedirectTo?: string;
  readonly logoutRedirectTo?: string;
};

export const useLoggedIn = ({
  loginRedirectTo = "/",
  logoutRedirectTo = "/",
}: UseLoginOptions = {}) => {
  const [userProfile, setUserProfile] = useRecoilState<UserProfile | null>(
    userProfileState
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile) {
      const now = dayjs().unix();
      if (now > (userProfile.expirationTimeStamp as number)) {
        setUserProfile(null);
      }
    }
  }, [userProfile, setUserProfile]);

  const login = (info: UserProfile) => {
    const now = dayjs().unix();
    if (now > (info.expirationTimeStamp as number)) {
      logout();
      return;
    }
    setUserProfile(info);
    navigate(loginRedirectTo);
  };

  const logout = () => {
    setUserProfile(null);
    navigate(logoutRedirectTo);
  };

  return { loggedIn: userProfile !== null, login, logout };
};
