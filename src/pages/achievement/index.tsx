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
    <Box component="div" sx={{ display: { xs: "block", sm: "flex" } }} gap={2}>
      <Box>
        <Profile userId={userId} />
        <Divider />
        {data && <LanguageACCount submissions={data} />}
        <Divider />
        {data && <TagACCount submissions={data} />}
      </Box>
      <Box sx={{ flexGrow: { sm: "1" } }}>
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
            <Divider />
            <HeatMap tableData={tableData} />
            <Divider />
            <DifficultyPies submissions={data} />
            <ClassificationPies submissions={data} />
          </>
        )}
      </Box>
    </Box>
  );
};
