import React from "react";
import Stack from "@mui/material/Stack";
import type { Classification } from "@features/contests/contest";
import { ContestTypeFilter } from "./ContestTypeFilter";
import { SolvedStatus, SolvedStatusFilter } from "./SolvedStatusFilter";
import { PeriodFilterButton, PeriodWord } from "./PeriodFilter";
import { ResetFilterButton } from "@features/contests/components/ResetFilter";
import { ViewFilter } from "@features/contests/components/ViewFilter";

type Props = {
  showDifficulty: boolean;
  reverse: boolean;
  classification: Classification;
  period: PeriodWord;
  solvedStatus: SolvedStatus;
  setClassification: (arg: Classification) => void;
  setPeriod: (arg: PeriodWord) => void;
  setSolvedStatus: (arg: SolvedStatus) => void;
  toggleShowDifficulty: () => void;
  toggleReverse: () => void;
};

export const FilterOptions: React.FC<Props> = React.memo(
  ({
    showDifficulty,
    reverse,
    classification,
    period,
    solvedStatus,
    setClassification,
    setPeriod,
    setSolvedStatus,
    toggleShowDifficulty,
    toggleReverse,
  }) => {
    return (
      <Stack direction="row" spacing={2} sx={{ py: 1 }}>
        <ContestTypeFilter
          classification={classification}
          setClassification={setClassification}
        />
        <PeriodFilterButton period={period} setPeriod={setPeriod} />
        <SolvedStatusFilter
          solvedStatus={solvedStatus}
          setSolvedStatus={setSolvedStatus}
        />
        <ViewFilter
          showDifficulty={showDifficulty}
          reverse={reverse}
          toggleShowDifficulty={toggleShowDifficulty}
          toggleReverse={toggleReverse}
        />
        <ResetFilterButton
          setClassification={setClassification}
          setPeriod={setPeriod}
          setSolvedStatus={setSolvedStatus}
        />
      </Stack>
    );
  }
);
