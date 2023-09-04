import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@features/ui/component/CircularProgress";
import { AlertMessage } from "@features/ui/component/AlertDialog";
import { useFetchCustomContestByContestId } from "@features/custom_contests/hooks/useFetchCustomContestByContestId";
import { CountdownScheduler } from "@features/custom_contests/components/CountdownScheduler";
import { Chip } from "@features/ui/component/Chip";
import { Standings } from "@features/custom_contests/components/Standings";
import { Problems } from "@features/custom_contests/components/Problems";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { RegisterButton } from "@features/custom_contests/components/RegisterButton";
import { Divider } from "@mui/material";
import { HeadLine } from "@features/layout/components/HeadLine";
import { utcISOStringToLocal } from "@helpers/date";
import { SocialShare } from "@features/custom_contests/components/SocialShare";
import { TrainingStandings } from "@features/custom_contests/components/TrainingStandings";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel_ } from "@features/ui/component/Tabs";

export const ShowCustomContestPage: React.FC = () => {
  const { loggedIn } = useLoggedIn();
  const { codeforcesUsername } = useUserProfile();

  const params = useParams();
  const contestId = params.contestId ?? "";
  const { data, isLoading, isError, error } = useFetchCustomContestByContestId({
    contestId,
  });

  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isError) {
    return (
      <AlertMessage
        title="Error"
        message="The specified contest does not exist. Please check the URL and try again."
      />
    );
  }

  return (
    <>
      {(!loggedIn || !codeforcesUsername) && (
        <AlertMessage
          title=""
          message="To Register to participate, You need to be logged in and set your Codeforces User ID."
        />
      )}
      {data && (
        <Container maxWidth="lg">
          <HeadLine title={data.title} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1} pt={2}>
                <Chip label={data.visibility} />
                <Chip label={data.mode} />
                <Chip label={"Created by: " + data.owner} />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <CountdownScheduler
                title={data.title}
                description={utcISOStringToLocal(data.description)}
                startDate={utcISOStringToLocal(data.startDate)}
                endDate={data.endDate}
              />
              <Stack
                direction="row-reverse"
                alignItems="center"
                justifyContent="space-between"
              >
                <RegisterButton />
                <SocialShare />
              </Stack>
              <Stack
                p={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Typography sx={{ mt: 2, flex: 4, fontWeight: "bold" }}>
                  Description
                </Typography>
                <Typography sx={{ mt: 2, flex: 8 }}>
                  {data.description}
                </Typography>
              </Stack>
              <Divider />
              <Stack
                p={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Typography sx={{ mt: 2, flex: 4, fontWeight: "bold" }}>
                  Period
                </Typography>
                <Typography sx={{ mt: 2, flex: 8 }}>
                  {utcISOStringToLocal(data.startDate)} ~{" "}
                  {utcISOStringToLocal(data.endDate)}
                </Typography>
              </Stack>
              <Divider />
              <Stack
                p={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Typography fontWeight="fontWeightBold" sx={{ mt: 2, flex: 4 }}>
                  Penalty
                </Typography>
                <Typography sx={{ mt: 2, flex: 8 }}>
                  {data.penalty} seconds per wrong submission
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Box
            pt={{ xs: 2, md: 4 }}
            pb={{ xs: 2, md: 4 }}
            px={{ xs: 0, md: 2 }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="Problems and Standings Tabs"
            >
              <Tab
                value={0}
                label={<Typography fontWeight="bold">Problem</Typography>}
                sx={{ textTransform: "none" }}
                disableTouchRipple
              />
              <Tab
                value={1}
                label={<Typography fontWeight="bold">Standing</Typography>}
                sx={{ textTransform: "none" }}
                disableTouchRipple
              />
            </Tabs>
            <TabPanel_ value={tabValue} index={0}>
              <Problems problems={data.problems} />
            </TabPanel_>
            <TabPanel_ value={tabValue} index={1}>
              <Suspense fallback={<CircularProgress />}>
                {data.mode === "Normal" && (
                  <Standings
                    participants={data.participants}
                    problems={data.problems}
                    startDate={data.startDate}
                    endDate={data.endDate}
                    penalty={data.penalty}
                  />
                )}
                {data.mode === "Training" && (
                  <TrainingStandings
                    participants={data.participants}
                    problems={data.problems}
                    startDate={data.startDate}
                    endDate={data.endDate}
                  />
                )}
              </Suspense>
            </TabPanel_>
          </Box>
        </Container>
      )}
    </>
  );
};
