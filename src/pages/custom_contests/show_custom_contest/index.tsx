import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
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

export const ShowCustomContestPage: React.FC = () => {
  const navigate = useNavigate();

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
          <RegisterButton />
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
