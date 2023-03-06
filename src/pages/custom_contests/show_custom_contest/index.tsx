import React from "react";
import { useParams } from "react-router-dom";
import { useFetchPublicCustomContest } from "@features/custom_contests/useFetchCustomContest";
import { CircularProgress } from "@mui/material";
import { ContestDetail } from "@features/custom_contests/components/ContestDetail";

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
      <div>this is Show CustomContestPage. UUID:{contestId}</div>
      {data && <ContestDetail customContest={data} />}
    </>
  );
};
