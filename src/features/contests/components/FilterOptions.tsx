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
  showACStatus: boolean;
  pinTableHeader: boolean;
  reverse: boolean;
  classification: Classification;
  period: PeriodWord;
  solvedStatus: SolvedStatus;
  setClassification: (arg: Classification) => void;
  setPeriod: (arg: PeriodWord) => void;
  setSolvedStatus: (arg: SolvedStatus) => void;
  toggleShowDifficulty: () => void;
  toggleShowACStatus: () => void;
  togglePinTableHeader: () => void;
  toggleReverse: () => void;
};

export const FilterOptions: React.FC<Props> = React.memo(
  ({
    showDifficulty,
    showACStatus,
    pinTableHeader,
    reverse,
    classification,
    period,
    solvedStatus,
    setClassification,
    setPeriod,
    setSolvedStatus,
    toggleShowDifficulty,
    toggleShowACStatus,
    togglePinTableHeader,
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
          showACStatus={showACStatus}
          pinTableHeader={pinTableHeader}
          reverse={reverse}
          toggleShowDifficulty={toggleShowDifficulty}
          toggleShowACStatus={toggleShowACStatus}
          toggleReverse={toggleReverse}
          togglePinTableHeader={togglePinTableHeader}
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
