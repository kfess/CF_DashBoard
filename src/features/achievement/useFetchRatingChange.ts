import axios from "axios";
import { ZodError } from "zod";
import { useQuery } from "@tanstack/react-query";
import { CF_RATING_CHANGE_URL } from "@constants/url";
import { okRatingChangeApiSchema } from "@features/achievement/ratingChange";
import type { RatingChange } from "@features/achievement/ratingChange";

export const useFetchRatingChange = ({ userId }: { userId: string | null }) => {
  const { data, isError, error, isLoading, isSuccess } = useQuery<
    RatingChange[],
    Error
  >({
    queryKey: ["ratingChange", userId],
    queryFn: async (): Promise<RatingChange[]> => {
      try {
        const url = `${CF_RATING_CHANGE_URL}?handle=${userId}`;
        const response = await axios.get(url);
        const ratingChange = okRatingChangeApiSchema.parse(response.data);
        return ratingChange.result;
      } catch (err) {
        if (err instanceof ZodError) {
          throw new Error("validation error");
        }
        throw new Error("rating change fetch error");
      }
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    useErrorBoundary: false, // For now, we don't want to use ErrorBoundary
  });

  return { data, isError, error, isLoading, isSuccess };
};
