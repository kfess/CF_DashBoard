import React from "react";
import Box from "@mui/material/Box";
import { useFetchRecentSubmissions } from "../useFetchSubmission";

export const RecentSubmission: React.FC = () => {
  const { data, isError, error, isLoading } = useFetchRecentSubmissions();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      {data?.map((d) => (
        <div>{d.contestId}</div>
      ))}
    </>
  );
};
