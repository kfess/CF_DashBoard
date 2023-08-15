import axios from "axios";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import { CF_USER_INFO_URL } from "@constants/url";
import { okUserInfoApiSchema } from "@features/layout/userInfo";
import type { UserInfo } from "@features/layout/userInfo";

export const useFetchUserInfo = ({ userId }: { userId?: string }) => {
  const { data, isError, error, isLoading, isSuccess } = useQuery<
    UserInfo,
    Error
  >({
    queryKey: ["userInfo", userId],
    queryFn: async (): Promise<UserInfo> => {
      try {
        const url = `${CF_USER_INFO_URL}?handles=${userId}`;
        const response = await axios.get(url);

        if (
          typeof response.data === "string" &&
          response.data.includes("Codeforces is temporarily unavailable.")
        ) {
          throw new Error("Codeforces is temporarily unavailable.");
        }

        const userInfo = okUserInfoApiSchema.parse(response.data);
        return userInfo.result[0];
      } catch (err) {
        if (err instanceof ZodError) {
          throw new Error("validation error");
        }
        throw err;
      }
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    suspense: false, // For now, we don't want to use suspense
    useErrorBoundary: false, // For now, we don't want to use ErrorBoundary
  });

  return { data, isError, error, isLoading, isSuccess };
};
