import React from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@features/ui/component/CircularProgress";
import { AlertMessage } from "@features/ui/component/AlertDialog";
import type { TabItem } from "@features/ui/component/Tabs";
import { Tabs } from "@features/ui/component/Tabs";
import { useFetchCustomContestByContestId } from "@features/custom_contests/hooks/useFetchCustomContestByContestId";
import { CountdownScheduler } from "@features/custom_contests/components/CountdownScheduler";
import { Chip_ } from "@features/ui/component/Chip";
import { Standings } from "@features/custom_contests/components/Standings";
import { Problems } from "@features/custom_contests/components/Problems";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { RegisterButton } from "@features/custom_contests/components/RegisterButton";
import { Divider, Stack } from "@mui/material";
import { HeadLine } from "@features/layout/components/HeadLine";
import { utcISOStringToLocal } from "@helpers/date";
import { SocialShare } from "@features/custom_contests/components/SocialShare";

export const ShowCustomContestPage: React.FC = () => {
  const { loggedIn } = useLoggedIn();
  const { codeforcesUsername } = useUserProfile();

  const params = useParams();
  const contestId = params.contestId ?? "";
  const { data, isLoading, isError, error } = useFetchCustomContestByContestId({
    contestId,
  });

  const tabItems: TabItem[] = data
    ? [
        {
          label: "Problem",
          children: <Problems problems={data.problems} />,
          disabled: false,
        },
        {
          label: "Standings",
          children: (
            <Standings
              participants={data.participants}
              problems={data.problems}
              startDate={data.startDate}
              endDate={data.endDate}
              penalty={data.penalty}
            />
          ),
          disabled: false,
        },
      ]
    : [];

  if (isLoading) {
    return <CircularProgress />;
  }

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
          <Box
            pt={{ xs: 2, md: 4 }}
            pb={{ xs: 2, md: 4 }}
            px={{ xs: 0, md: 2 }}
          >
            <HeadLine title={data.title} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1} py={1}>
                  <Chip_ label={data.visibility} />
                  <Chip_ label={data.mode} />
                  <Chip_ label={"Created by: " + data.owner} />
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
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <RegisterButton />
                  <SocialShare />
                </Stack>

                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ mt: 2, flex: 4, fontWeight: "bold" }}>
                    Description
                  </Typography>
                  <Typography sx={{ mt: 2, flex: 8 }}>
                    {data.description}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography sx={{ mt: 2, flex: 4, fontWeight: "bold" }}>
                    Period
                  </Typography>
                  <Typography sx={{ mt: 2, flex: 8 }}>
                    {utcISOStringToLocal(data.startDate)} ~{" "}
                    {utcISOStringToLocal(data.endDate)}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography
                    fontWeight="fontWeightBold"
                    sx={{ mt: 2, flex: 4 }}
                  >
                    Penalty
                  </Typography>
                  <Typography sx={{ mt: 2, flex: 8 }}>
                    {data.penalty} seconds
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Tabs tabItems={tabItems} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
};
