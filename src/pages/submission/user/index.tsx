import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { UserSubmission } from "@features/submission/components/UserSubmission";
import { SolvedStatusFilter } from "@features/submission/components/SolvedStatusFilter";
import type { SolvedStatus } from "@features/submission/components/SolvedStatusFilter";

export const UserSubmissionPage: React.FC = () => {
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const userId = urlQueries.get("userId") ?? "";

  const [solvedStatus, setSolvedStatus] = useState<SolvedStatus>("All");

  return (
    <>
      <SolvedStatusFilter
        solvedStatus={solvedStatus}
        setSolvedStatus={setSolvedStatus}
      />
      <UserSubmission userId={userId} solvedStatus={solvedStatus} />
    </>
  );
};
