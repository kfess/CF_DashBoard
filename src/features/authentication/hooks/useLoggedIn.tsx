import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "@features/authentication/userProfile";
import { userProfileState } from "@features/authentication/userProfile.atom";
import axios from "axios";

type UseLoginOptions = {
  readonly loginRedirectTo?: string;
  readonly logoutRedirectTo?: string;
};

export const useLoggedIn = ({
  loginRedirectTo = "/",
  logoutRedirectTo = "/",
}: UseLoginOptions = {}) => {
  const [userProfile, setUserProfile] =
    useRecoilState<UserProfile | null>(userProfileState);
  const loggedIn = userProfile !== null;
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/users/verify",
        { withCredentials: true }
      );
      if (response.status !== 200) {
        setUserProfile(null);
      }
    };
    checkStatus();
  }, []);

  const login = (info: UserProfile) => {
    setUserProfile(info);
    navigate(loginRedirectTo);
  };

  const logout = () => {
    setUserProfile(null);
    navigate(logoutRedirectTo);
  };

  return { loggedIn, login, logout };
};
