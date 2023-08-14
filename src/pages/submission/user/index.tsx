import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { UserSubmission } from "@features/submission/components/UserSubmission";
import type { VerdictFilter } from "@features/submission/submission";
import { VerdictFilterButton } from "@features/submission/components/VerdictFilter";
import type { LanguageFilter } from "@features/submission/components/LanguageFilter";
import { LanguageFilterButton } from "@features/submission/components/LanguageFilter";
import { ContestTypeFilter } from "@features/contests/components/ContestTypeFilter";
import { Classification } from "@features/contests/contest";
import { FilterChips } from "@features/submission/components/FilterChips";
import { useURLQuery } from "@hooks/useQueryParams";

type Props = { userId?: string };

export const UserSubmissionPage: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId]);

  const { queryParams, setURLQuery } = useURLQuery();

  const [verdictStatus, setVerdictStatus] = useState<VerdictFilter>(
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

  const onSelectVerdictStatus = (verdictStatus: VerdictFilter) => {
    setVerdictStatus(verdictStatus);
    setURLQuery({ verdict: verdictStatus });
  };

  const onSelectDefaultVerdictStatus = () => {
    setVerdictStatus("All");
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
        <VerdictFilterButton
          verdictStatus={verdictStatus}
          setVerdictStatus={onSelectVerdictStatus}
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
          verdictStatus={verdictStatus}
          setVerdictStatus={onSelectDefaultVerdictStatus}
          language={language}
          setLanguage={onSelectDefaultLanguage}
        />
      </div>
      {userId && (
        <UserSubmission
          userId={userId}
          classification={classification}
          verdictStatus={verdictStatus}
          language={language}
        />
      )}
    </>
  );
};
