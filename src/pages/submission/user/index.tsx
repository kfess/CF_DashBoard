import React, { useState } from "react";
import { css } from "@emotion/react";
import { UserSubmission } from "@features/submission/components/UserSubmission";
import type { VerdictFilter } from "@features/submission/components/SolvedStatusFilter";
import { SolvedStatusFilterButton } from "@features/submission/components/SolvedStatusFilter";
import type { LanguageFilter } from "@features/submission/components/LanguageFilter";
import { LanguageFilterButton } from "@features/submission/components/LanguageFilter";
import { ContestTypeFilter } from "@features/contests/components/ContestTypeFilter";
import { Classification } from "@features/contests/contest";

const buttonsCss = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginTop: "0.5rem",
});

type Props = { userId: string | null | undefined };

export const UserSubmissionPage: React.FC<Props> = ({ userId }) => {
  const [solvedStatus, setSolvedStatus] = useState<VerdictFilter>("All");
  const [language, setLanguage] = useState<LanguageFilter>("All");
  const [classification, setClassification] = useState<Classification>("All");

  return (
    <>
      <div css={buttonsCss}>
        <ContestTypeFilter
          classification={classification}
          setClassification={setClassification}
        />
        <SolvedStatusFilterButton
          solvedStatus={solvedStatus}
          setSolvedStatus={setSolvedStatus}
        />
        <LanguageFilterButton language={language} setLanguage={setLanguage} />
      </div>

      {userId && (
        <UserSubmission
          userId={userId}
          solvedStatus={solvedStatus}
          language={language}
        />
      )}
    </>
  );
};
