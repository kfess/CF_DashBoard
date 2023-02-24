import React from "react";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useFetchUserSubmission } from "@features/submission/useFetchSubmission";
import { UniqueACCount } from "@features/achievement/components/UniqueACCount";
import { TotalRatingSum } from "@features/achievement/components/TotalRatingSum";
import { StreakSum } from "@features/achievement/components/StreakSum";
import { CurrentStreak } from "@features/achievement/components/CurrentStreak";
import { LongestStreak } from "@features/achievement/components/LongestStreak";
import { DailyChart } from "@features/achievement/components/DailyChart";
import { LanguageACCount } from "@features/achievement/components/LanguageACCount";
import { ClimbingChart } from "@features/achievement/components/ClimbingChart";
import { HeatMap } from "@features/achievement/components/HeatMap";
import { createTableData } from "@features/achievement/helper";
import { DifficultyPies } from "@features/achievement/components/DifficultyPies";
import { ClassificationPies } from "@features/achievement/components/ClassificationPies";
import { TagACCount } from "@features/achievement/components/TagACCount";
import { Profile } from "@features/achievement/components/Profile";
import { Divider } from "@mui/material";

export const AchievementPage: React.FC = () => {
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const userId = urlQueries.get("userId") ?? "";

  const { data, isError, error, isLoading } = useFetchUserSubmission({
    userId: userId,
  });
  const tableData = createTableData();

  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 4">
          <Profile userId={userId} />
          <Divider />
          {data && <LanguageACCount submissions={data} />}
          <Divider />
          {data && <TagACCount submissions={data} />}
        </Box>
        <Box gridColumn="span 8">
          {data && (
            <>
              <UniqueACCount submissions={data} period="Total" />
              <Divider />
              <TotalRatingSum submissions={data} />
              <Divider />
              <StreakSum submissions={data} />
              <CurrentStreak submissions={data} />
              <LongestStreak submissions={data} />
              <Divider />
              <DailyChart submissions={data} />
              <ClimbingChart submissions={data} />
            </>
          )}
        </Box>
      </Box>
      {/* {data && (
        <>
          <UniqueACCount submissions={data} period="Total" />
          <TotalRatingSum submissions={data} />
          <StreakSum submissions={data} />
          <CurrentStreak submissions={data} />
          <LongestStreak submissions={data} />
          <DifficultyPies submissions={data} />
          <ClassificationPies submissions={data} />
          <DailyChart submissions={data} />
          <ClimbingChart submissions={data} />
          <LanguageACCount submissions={data} />
          <TagACCount submissions={data} />
          <HeatMap tableData={tableData} />
        </>
      )} */}
    </>
  );
};
