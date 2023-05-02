import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useFetchUserInfo } from "@features/layout/useUserInfo";
import { useFetchUserSubmission } from "@features/submission/hooks/useFetchSubmission";
import { UniqueACCount } from "@features/achievement/components/UniqueACCount";
import { TotalRatingSum } from "@features/achievement/components/TotalRatingSum";
import { DailyChart } from "@features/achievement/components/DailyChart";
import { LanguageACCount } from "@features/achievement/components/LanguageACCount";
import { ClimbingChart } from "@features/achievement/components/ClimbingChart";
import { HeatMap } from "@features/achievement/components/HeatMap";
import { createTableData } from "@features/achievement/helper";
import { TagACCount } from "@features/achievement/components/TagACCount";
import { Profile } from "@features/achievement/components/Profile";
import { Divider, Typography } from "@mui/material";
import { Community } from "@features/achievement/components/Community";
import { Streak } from "@features/achievement/components/Streak";
import { Pies } from "@features/achievement/components/Pies";
import { useQueryParams, QueryParamKeys } from "@hooks/useQueryParams";
import { SearchBar } from "@features/layout/components/Search";

export const AchievementPage: React.FC = () => {
  const userId = useQueryParams(QueryParamKeys.USERID);

  const { data, isError, error, isLoading } = useFetchUserSubmission({
    userId: userId,
  });
  const tableData = createTableData();

  const userInfo = useFetchUserInfo({ userId }).data;

  if (!userId) {
    return (
      <>
        <SearchBar visible={true} />
      </>
    );
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: { xs: "block", sm: "flex" } }} gap={1}>
      <Box
        sx={{
          m: 1,
          p: 2,
          width: { sm: "300px" },
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: [1, 1, 1, 1],
          marginBottom: "auto",
        }}
      >
        <Profile userInfo={userInfo} />
        <Divider />
        <Community
          contribution={userInfo?.contribution}
          friendsOfCount={userInfo?.friendOfCount}
        />
        <Divider />
        {data && <LanguageACCount submissions={data} />}
        <Divider />
        {data && <TagACCount submissions={data} />}
      </Box>
      <Box sx={{ flex: { sm: 1 } }}>
        <Box
          sx={{
            m: 1,
            p: 2,
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: [1, 1, 1, 1],
          }}
        >
          {data && (
            <>
              <UniqueACCount submissions={data} />
              <TotalRatingSum submissions={data} />
            </>
          )}
        </Box>
        <Box
          sx={{
            m: 1,
            p: 2,
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: [1, 1, 1, 1],
          }}
        >
          {data && <Streak submissions={data} />}
        </Box>
        <Box
          sx={{
            m: 1,
            p: 2,
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: [1, 1, 1, 1],
          }}
        >
          {data && <DailyChart submissions={data} />}
        </Box>
        <Box
          sx={{
            m: 1,
            p: 2,
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: [1, 1, 1, 1],
          }}
        >
          {data && <ClimbingChart submissions={data} />}
        </Box>
        <Box
          sx={{
            m: 1,
            p: 2,
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: [1, 1, 1, 1],
          }}
        >
          {data && <Pies submissions={data} />}
        </Box>

        {data && <HeatMap tableData={tableData} />}
      </Box>
    </Box>
  );
};
