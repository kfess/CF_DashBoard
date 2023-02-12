import React from "react";
import { useLocation } from "react-router-dom";
import { useFetchUserSubmission } from "@features/submission/useFetchSubmission";
import { UniqueACCount } from "@features/achievement/components/UniqueACCount";
import { TotalRatingSum } from "@features/achievement/components/TotalRatingSum";
import { StreakSum } from "@features/achievement/components/StreakSum";
import { CurrentStreak } from "@features/achievement/components/CurrentStreak";
import { LongestStreak } from "@features/achievement/components/LongestStreak";
import { DailyChart } from "@features/achievement/components/DailyChart";
import { LanguageACCount } from "@features/achievement/components/LanguageACCount";

export const AchievementPage: React.FC = () => {
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const userId = urlQueries.get("userId") ?? "";

  const { data, isError, error, isLoading } = useFetchUserSubmission({
    userId: userId,
  });

  return (
    <>
      {data && (
        <>
          <UniqueACCount submissions={data} period="Total" />
          <TotalRatingSum submissions={data} />
          <StreakSum submissions={data} />
          <CurrentStreak submissions={data} />
          <LongestStreak submissions={data} />
          <DailyChart submissions={data} />
          <LanguageACCount submissions={data} />
        </>
      )}
    </>
  );
};
