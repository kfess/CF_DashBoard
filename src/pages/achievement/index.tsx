import React, { useMemo, useEffect, Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
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
import { UserSubmissionPage } from "@pages/submission/user/index";
import { HeatMaps } from "@features/achievement/components/HeatMaps";
import { isACSubmission } from "@features/achievement/processSubmission";
import { Accuracy } from "@features/achievement/components/Accuracy";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel_ } from "@features/ui/component/Tabs";
import { CircularProgress } from "@features/ui/component/CircularProgress";

export const AchievementPage: React.FC = () => {
  const { queryParams } = useURLQuery();
  const userId = queryParams["userId"];

  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId]);

  const { data: allSubmissions } = useFetchUserSubmission({
    userId: userId,
  });
  const acSubmissions = useMemo(
    () => allSubmissions.filter(isACSubmission),
    [allSubmissions]
  );

  const userInfo = useFetchUserInfo({ userId }).data;

  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box pt={{ xs: 2, md: 4 }} pb={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title={`${userId}'s Achievement`} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                ".MuiTabs-scrollButtons.Mui-disabled": {
                  opacity: 0.3,
                },
              }}
              aria-label="Problems and Standings Tabs"
            >
              <Tab
                value={0}
                label={<Typography fontWeight="bold">Summary</Typography>}
                sx={{ textTransform: "none" }}
                disableTouchRipple
                disabled={!userId}
              />
              <Tab
                value={1}
                label={<Typography fontWeight="bold">Pie Charts</Typography>}
                sx={{ textTransform: "none" }}
                disableTouchRipple
                disabled={!userId}
              />
              <Tab
                value={2}
                label={
                  <Typography fontWeight="bold">Progress Charts</Typography>
                }
                sx={{ textTransform: "none" }}
                disableTouchRipple
                disabled={!userId}
              />
              <Tab
                value={3}
                label={<Typography fontWeight="bold">Submissions</Typography>}
                sx={{ textTransform: "none" }}
                disableTouchRipple
                disabled={!userId}
              />
            </Tabs>
            <TabPanel_ value={tabValue} index={0}>
              <Suspense fallback={<CircularProgress />}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: (theme) =>
                          theme.palette.background.paper,
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        borderRadius: 1,
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
                      p={2}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.background.paper,
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                      }}
                    >
                      <>
                        <UniqueACCount submissions={acSubmissions} />
                        <TotalRatingSum submissions={acSubmissions} />
                      </>
                    </Box>
                    <Box
                      p={2}
                      mt={2}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.background.paper,
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                      }}
                    >
                      <Accuracy allSubmissions={allSubmissions} />
                    </Box>
                    <Box
                      p={2}
                      mt={2}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.background.paper,
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                      }}
                    >
                      <Streak
                        allSubmissions={allSubmissions}
                        acSubmissions={acSubmissions}
                      />
                    </Box>
                    <Box
                      p={2}
                      mt={2}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.background.paper,
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                      }}
                    >
                      <HeatMaps submissions={allSubmissions} />
                    </Box>
                  </Grid>
                </Grid>
              </Suspense>
            </TabPanel_>
            <TabPanel_ value={tabValue} index={1}>
              <Suspense fallback={<CircularProgress />}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      p={1}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.background.paper,
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                      }}
                    >
                      <Pies submissions={allSubmissions} />
                    </Box>
                  </Grid>
                </Grid>
              </Suspense>
            </TabPanel_>
            <TabPanel_ value={tabValue} index={2}>
              <Suspense fallback={<CircularProgress />}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      p={1}
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.background.paper,
                        border: (theme) =>
                          `0.5px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                      }}
                    >
                      <DailyChart submissions={acSubmissions} />
                      <Divider />
                      <ClimbingChart submissions={acSubmissions} />
                    </Box>
                  </Grid>
                </Grid>
              </Suspense>
            </TabPanel_>
            <Suspense fallback={<CircularProgress />}>
              <TabPanel_ value={tabValue} index={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <UserSubmissionPage userId={userId} />
                  </Grid>
                </Grid>
              </TabPanel_>
            </Suspense>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
