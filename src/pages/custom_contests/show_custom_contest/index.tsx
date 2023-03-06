import React from "react";
import { useParams } from "react-router-dom";
import { useFetchPublicCustomContest } from "@features/custom_contests/useFetchCustomContest";
import { CircularProgress } from "@mui/material";
import { ContestDetail } from "@features/custom_contests/components/ContestDetail";

export const ShowCustomContestPage: React.FC = () => {
  const params = useParams();
  const { data, isLoading } = useFetchPublicCustomContest();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      {params.contestId}
      <div>this is Show CustomContestPage</div>
      {data && <ContestDetail customContest={data} />}
    </>
  );
};
