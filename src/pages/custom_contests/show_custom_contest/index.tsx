import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@features/ui/component/CircularProgress";
import { AlertMessage } from "@features/ui/component/AlertDialog";
import type { TabItem } from "@features/ui/component/Tabs";
import { Tabs } from "@features/ui/component/Tabs";
import { useFetchPublicCustomContest } from "@features/custom_contests/useFetchCustomContest";
import { CountdownScheduler } from "@features/custom_contests/components/CountdownScheduler";
import { Chip_ } from "@features/ui/component/Chip";
import { Standings } from "@features/custom_contests/components/Standings";
import { Problems } from "@features/custom_contests/components/Problems";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";
import { RegisterButton } from "@features/custom_contests/components/RegisterButton";
import { Divider } from "@mui/material";

export const ShowCustomContestPage: React.FC = () => {
  const { loggedIn } = useLoggedIn();
  const { codeforcesUsername } = useUserProfile();

  const params = useParams();
  const contestId = params.contestId ?? "";
  const { data, isLoading, isError, error } = useFetchPublicCustomContest({
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
        <Box sx={{ m: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: { xs: 1, md: 0 } }}
            >
              {data.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: { xs: 1, md: 0 },
                gap: 1,
              }}
            >
              <Chip_ label={data.visibility} />
              <Chip_ label={data.mode} />
              <Chip_ label={"Created by: " + data.owner} />
            </Box>
          </Box>

          <CountdownScheduler
            title={data.title}
            description={data.description}
            startDate={data.startDate}
            endDate={data.endDate}
          />
          <RegisterButton />
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
            <Typography sx={{ mt: 2, flex: 8 }}>{data.description}</Typography>
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
              {data.startDate} ~ {data.endDate}
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
              Penalty
            </Typography>
            <Typography sx={{ mt: 2, flex: 8 }}>
              {data.penalty} seconds
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Tabs tabItems={tabItems} />
          </Box>
        </Box>
      )}
    </>
  );
};
