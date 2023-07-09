import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "@features/authentication/userProfile";
import { userProfileState } from "@features/authentication/userProfile.atom";
import { INTERNAL_API_BASE_URL } from "@constants/url";

const fetchLoggedInStatus = async () => {
  try {
    const response = await axios.get(INTERNAL_API_BASE_URL + "/users/verify", {
      withCredentials: true,
    });

    return response.status === 200;
  } catch (error) {
    console.error("Error while fetching user status:", error);
    return false;
  }
};

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

  useQuery({
    queryKey: ["loggedInStatus"],
    queryFn: fetchLoggedInStatus,
    refetchInterval: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    enabled: loggedIn,
    onSuccess: (isLoggedIn) => {
      if (!isLoggedIn) {
        setUserProfile(null);
      }
    },
  });

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
