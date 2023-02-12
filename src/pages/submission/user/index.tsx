import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { UserSubmission } from "@features/submission/components/UserSubmission";
import type { VerdictFilter } from "@features/submission/components/SolvedStatusFilter";
import { SolvedStatusFilterButton } from "@features/submission/components/SolvedStatusFilter";
import type { LanguageFilter } from "@features/submission/components/LanguageFilter";
import { LanguageFilterButton } from "@features/submission/components/LanguageFilter";
import { ContestTypeFilter } from "@features/contests/components/ContestTypeFilter";
import { Classification } from "@features/contests/contest";

export const UserSubmissionPage: React.FC = () => {
  const { search } = useLocation();
  const urlQueries = new URLSearchParams(search);
  const userId = urlQueries.get("userId") ?? "";

  const [solvedStatus, setSolvedStatus] = useState<VerdictFilter>("All");
  const [language, setLanguage] = useState<LanguageFilter>("All");
  const [classification, setClassification] = useState<Classification>("All");

  return (
    <>
      <ContestTypeFilter
        classification={classification}
        setClassification={setClassification}
      />
      <SolvedStatusFilterButton
        solvedStatus={solvedStatus}
        setSolvedStatus={setSolvedStatus}
      />
      <LanguageFilterButton language={language} setLanguage={setLanguage} />
      <UserSubmission
        userId={userId}
        solvedStatus={solvedStatus}
        language={language}
      />
    </>
  );
};
