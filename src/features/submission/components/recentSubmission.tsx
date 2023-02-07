import React from "react";
import Box from "@mui/material/Box";
import { useFetchRecentSubmissions } from "../useFetchSubmission";
import { normalizeLanguage } from "@features/language/language";

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
        <Box sx={{ p: 1, m: 1, display: "flex" }}>
          <div>{d.id}</div>
          <div>{d.contestId}</div>
          <div>{normalizeLanguage(d.programmingLanguage)}</div>
          <div>{d.verdict}</div>
          <div>
            {d.problem.tags.map((tag) => (
              <div>{tag}</div>
            ))}
          </div>
        </Box>
      ))}
    </>
  );
};
