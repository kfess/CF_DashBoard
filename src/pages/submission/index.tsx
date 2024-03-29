import React, { Suspense } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { RecentSubmissionPage } from "@pages/submission/recent";
import { UserSubmissionPage } from "@pages/submission/user/index";
import { HeadLine } from "@features/layout/components/HeadLine";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { useURLQuery } from "@hooks/useQueryParams";
import { TabPanel, Tabs, Tab } from "@features/ui/component/Tabs";
import { CircularProgress } from "@features/ui/component/CircularProgress";

export const SubmissionPage: React.FC = () => {
  const { queryParams } = useURLQuery();
  const userId = queryParams["userId"];

  const { loggedIn } = useLoggedIn();
  const { codeforcesUsername } = useUserProfile();

  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box py={{ xs: 2, md: 4 }} px={{ xs: 0, md: 2 }}>
        <HeadLine title="Submissions" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="Problems and Standings Tabs"
            >
              <Tab value={0} label="Recent Submission" />
              <Tab
                value={1}
                label={`
                  ${userId ? userId : "User"}'s Submission`}
                disabled={!userId}
              />
              <Tab
                value={2}
                label={`
                  ${codeforcesUsername ? codeforcesUsername : "My"} Submission`}
                disabled={!loggedIn || !codeforcesUsername}
              />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <Suspense fallback={<CircularProgress />}>
                <RecentSubmissionPage />
              </Suspense>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Suspense fallback={<CircularProgress />}>
                <UserSubmissionPage userId={userId} />
              </Suspense>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Suspense fallback={<CircularProgress />}>
                <UserSubmissionPage userId={codeforcesUsername} />
              </Suspense>
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
