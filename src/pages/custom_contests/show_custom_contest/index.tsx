import React from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress, Box } from "@mui/material";
import { AlertMessage } from "@features/ui/component/AlertDialog";
import type { TabItem } from "@features/ui/component/Tabs";
import { Tabs } from "@features/ui/component/Tabs";
import {
  useAddParticipantToContest,
  useFetchPublicCustomContest,
  useHasUserRegistered,
} from "@features/custom_contests/useFetchCustomContest";
import { CountdownScheduler } from "@features/custom_contests/components/CountdownScheduler";
import { Chip_ } from "@features/ui/component/Chip";
import { Standings } from "@features/custom_contests/components/Standings";
import { Problems } from "@features/custom_contests/components/Problems";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";
import { useUserProfile } from "@features/authentication/hooks/useUserProfile";

export const ShowCustomContestPage: React.FC = () => {
  const { loggedIn } = useLoggedIn();
  const { codeforcesUsername } = useUserProfile();

  const params = useParams();
  const contestId = params.contestId ?? "";
  const { data, isLoading, isError, error } = useFetchPublicCustomContest({
    contestId,
  });

  const { data: isUserRegistered } = useHasUserRegistered(
    contestId,
    codeforcesUsername
  );
  const { mutate } = useAddParticipantToContest();

  const tabItems: TabItem[] = [
    {
      label: "Problem",
      children: data && <Problems problems={data.problems} />,
      disabled: false,
    },
    {
      label: "Standings",
      children: data && (
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
  ];

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    console.log(error);
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
          <h2>
            {data.title}
            <Chip_ label={data.visibility} />
            <Chip_ label={data.mode} />
          </h2>
          <CountdownScheduler
            title={data.title}
            description={data.description}
            startDate={data.startDate}
            endDate={data.endDate}
          />

          <Box sx={{ m: 1, textAlign: "right" }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              css={{ textTransform: "none" }}
              disabled={!loggedIn || !codeforcesUsername || isUserRegistered}
              onClick={() => {
                mutate(contestId, codeforcesUsername);
              }}
            >
              {isUserRegistered
                ? "Already registered"
                : "Register to participate"}
            </Button>
          </Box>

          <h3>{data.description}</h3>
          <div>
            Period: {data.startDate} ~ {data.endDate}
          </div>
          <div>Penalty: {data.penalty}</div>
          <Tabs tabItems={tabItems} />
        </Box>
      )}
    </>
  );
};
