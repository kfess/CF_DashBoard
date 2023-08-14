import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useFetchUserInfo } from "@features/layout/useUserInfo";
import { useFetchUserSubmission } from "@features/submission/hooks/useFetchSubmission";
import { UniqueACCount } from "@features/achievement/components/UniqueACCount";
import { TotalRatingSum } from "@features/achievement/components/TotalRatingSum";
import { DailyChart } from "@features/achievement/components/DailyChart";
import { LanguageACCount } from "@features/achievement/components/LanguageACCount";
import { ClimbingChart } from "@features/achievement/components/ClimbingChart";
import { TagACCount } from "@features/achievement/components/TagACCount";
import { Profile } from "@features/achievement/components/Profile";
import { Divider } from "@mui/material";
import { Community } from "@features/achievement/components/Community";
import { Streak } from "@features/achievement/components/Streak";
import { Pies } from "@features/achievement/components/Pies";
import { useURLQuery } from "@hooks/useQueryParams";
import { HeadLine } from "@features/layout/components/HeadLine";
import { TabItem, Tabs } from "@features/ui/component/Tabs";
import { UserSubmissionPage } from "@pages/submission/user/index";
import { HeatMaps } from "@features/achievement/components/HeatMaps";
import { isACSubmission } from "@features/achievement/processSubmission";
import { Accuracy } from "@features/achievement/components/Accuracy";

export const AchievementPage: React.FC = () => {
  const { queryParams } = useURLQuery();
  const userId = queryParams["userId"];

  if (!userId) return null;

  const { data: allSubmissions } = useFetchUserSubmission({
    userId: userId,
  });
  const acSubmissions = useMemo(
    () => allSubmissions.filter(isACSubmission),
    [allSubmissions]
  );

  const userInfo = useFetchUserInfo({ userId }).data;

  const tabItems: TabItem[] = [
    {
      label: "Summary",
      children: (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <Box
              sx={{
                p: 2,
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
              <LanguageACCount submissions={acSubmissions} />
              <Divider />
              <TagACCount submissions={acSubmissions} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "white",
                borderRadius: 1,
                boxShadow: [1, 1, 1, 1],
              }}
            >
              <>
                <UniqueACCount submissions={acSubmissions} />
                <TotalRatingSum submissions={acSubmissions} />
              </>
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
              <Accuracy
                allSubmissions={allSubmissions}
                acSubmissions={acSubmissions}
              />
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
              <Streak
                allSubmissions={allSubmissions}
                acSubmissions={acSubmissions}
              />
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
              <HeatMaps submissions={allSubmissions} />
            </Box>
          </Grid>
        </Grid>
      ),
      disabled: !userId,
    },

    {
      label: "Pie Charts",
      children: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 1,
                backgroundColor: "white",
                borderRadius: 1,
                boxShadow: [1, 1, 1, 1],
              }}
            >
              <Pies submissions={allSubmissions} />
            </Box>
          </Grid>
        </Grid>
      ),
      disabled: !userId,
    },

    {
      label: "Progress Charts",
      children: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                p: 1,
                backgroundColor: "white",
                borderRadius: 1,
                boxShadow: [1, 1, 1, 1],
              }}
            >
              <DailyChart submissions={acSubmissions} />
              <Divider />
              <ClimbingChart submissions={acSubmissions} />
            </Box>
          </Grid>
        </Grid>
      ),
      disabled: !userId,
    },
    {
      label: "Submissions",
      children: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <UserSubmissionPage userId={userId} />
          </Grid>
        </Grid>
      ),
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
