import React from "react";
import { useParams } from "react-router-dom";
import { useFetchPublicCustomContest } from "@features/custom_contests/useFetchCustomContest";
import { CircularProgress } from "@mui/material";
import { ContestDetail } from "@features/custom_contests/components/ContestDetail";
import { CountdownScheduler } from "@features/custom_contests/components/CountdownScheduler";
import { Chip_ } from "@features/ui/component/Chip";

export const ShowCustomContestPage: React.FC = () => {
  const params = useParams();
  const contestId = params.contestId ?? "";
  const { data, isLoading, isError, error } = useFetchPublicCustomContest({
    contestId,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    console.log(error);
  }

  return (
    <>
      {data && (
        <>
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
          {/* <ContestDetail customContest={data} /> */}
        </>
      )}
    </>
  );
};
