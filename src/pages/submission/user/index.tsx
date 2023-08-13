import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { UserSubmission } from "@features/submission/components/UserSubmission";
import type { VerdictFilter } from "@features/submission/components/SolvedStatusFilter";
import { SolvedStatusFilterButton } from "@features/submission/components/SolvedStatusFilter";
import type { LanguageFilter } from "@features/submission/components/LanguageFilter";
import { LanguageFilterButton } from "@features/submission/components/LanguageFilter";
import { ContestTypeFilter } from "@features/contests/components/ContestTypeFilter";
import { Classification } from "@features/contests/contest";
import { FilterChips } from "@features/submission/components/FilterChips";
import { useURLQuery } from "@hooks/useQueryParams";

type Props = { userId: string | null | undefined };

export const UserSubmissionPage: React.FC<Props> = ({ userId }) => {
  const { queryParams, setURLQuery } = useURLQuery();

  const [solvedStatus, setSolvedStatus] = useState<VerdictFilter>(
    queryParams.verdict || "All"
  );
  const [language, setLanguage] = useState<LanguageFilter>(
    queryParams.language || "All"
  );
  const [classification, setClassification] = useState<Classification>(
    queryParams.classification || "All"
  );

  const onSelectClassification = (classification: Classification) => {
    setClassification(classification);
    setURLQuery({ classification: classification });
  };

  const onSelectDefaultClassification = () => {
    setClassification("All");
    setURLQuery({ classification: undefined });
  };

  const onSelectSolvedStatus = (solvedStatus: VerdictFilter) => {
    setSolvedStatus(solvedStatus);
    setURLQuery({ verdict: solvedStatus });
  };

  const onSelectDefaultSolvedStatus = () => {
    setSolvedStatus("All");
    setURLQuery({ verdict: undefined });
  };

  const onSelectLanguage = (language: LanguageFilter) => {
    setLanguage(language);
    setURLQuery({ language: language });
  };

  const onSelectDefaultLanguage = () => {
    setLanguage("All");
    setURLQuery({ language: undefined });
  };

  return (
    <>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        <ContestTypeFilter
          classification={classification}
          onSelectClassification={onSelectClassification}
        />
        <SolvedStatusFilterButton
          solvedStatus={solvedStatus}
          setSolvedStatus={onSelectSolvedStatus}
        />
        <LanguageFilterButton
          language={language}
          setLanguage={onSelectLanguage}
        />
      </Stack>
      <div>
        <FilterChips
          classification={classification}
          setClassification={onSelectDefaultClassification}
          solvedStatus={solvedStatus}
          setSolvedStatus={onSelectDefaultSolvedStatus}
          language={language}
          setLanguage={onSelectDefaultLanguage}
        />
      </div>
      {userId && (
        <UserSubmission
          userId={userId}
          classification={classification}
          solvedStatus={solvedStatus}
          language={language}
        />
      )}
    </>
  );
};
