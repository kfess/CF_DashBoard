import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CircularProgress } from "@features/ui/component/CircularProgress";
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
import { Divider } from "@mui/material";
import { Community } from "@features/achievement/components/Community";
import { Streak } from "@features/achievement/components/Streak";
import { Pies } from "@features/achievement/components/Pies";
import { useQueryParams, QueryParamKeys } from "@hooks/useQueryParams";

import Grid from "@mui/material/Grid";
import { HeadLine } from "@features/layout/components/HeadLine";
import { TabItem, Tabs } from "@features/ui/component/Tabs";
import { UserSubmissionPage } from "@pages/submission/user/index";

export const AchievementPage: React.FC = () => {
  const userId = useQueryParams(QueryParamKeys.USERID);
  const { data, isError, error, isLoading } = useFetchUserSubmission({
    userId: userId,
  });
  const userInfo = useFetchUserInfo({ userId }).data;

  if (isLoading) {
    return <CircularProgress />;
  }

  const tabItems: TabItem[] = [
    {
      label: "Summary",
      children: (
        <Container maxWidth="lg">
          <Box sx={{ display: { xs: "block", sm: "flex" } }} gap={1}>
            <Box
              sx={{
                p: 2,
                width: { sm: "300px" },
                backgroundColor: "white",
                borderRadius: 1,
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
                  p: 2,
                  backgroundColor: "white",
                  borderRadius: 1,
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
                  p: 2,
                  marginTop: 2,
                  backgroundColor: "white",
                  borderRadius: 1,
                  boxShadow: [1, 1, 1, 1],
                }}
              >
                {data && <Streak submissions={data} />}
              </Box>
              <Box
                sx={{
                  p: 2,
                  marginTop: 2,
                  backgroundColor: "white",
                  borderRadius: 1,
                  boxShadow: [1, 1, 1, 1],
                }}
              >
                {/* <HeatMap tableData={tableData} /> */}
              </Box>
            </Box>
          </Box>
        </Container>
      ),
      disabled: !userId,
    },
    {
      label: "Solved Problems",
      children: (
        <>
          {data && (
            <Box
              sx={{
                m: 1,
                p: 1,
                backgroundColor: "white",
                borderRadius: 1,
                boxShadow: [1, 1, 1, 1],
              }}
            >
              <Pies submissions={data} />
            </Box>
          )}
        </>
      ),
      disabled: !userId,
    },
    {
      label: "Progress Charts",
      children: (
        <>
          {data && (
            <Box
              sx={{
                m: 1,
                p: 1,
                backgroundColor: "white",
                borderRadius: 1,
                boxShadow: [1, 1, 1, 1],
              }}
            >
              <DailyChart submissions={data} />
              <Divider />
              <ClimbingChart submissions={data} />
            </Box>
          )}
        </>
      ),
      disabled: !userId,
    },
    {
      label: "Submissions",
      children: <UserSubmissionPage userId={userId} />,
      disabled: !userId,
    },
  ];
  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title={`${userId}'s Achievement`} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs tabItems={tabItems} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
