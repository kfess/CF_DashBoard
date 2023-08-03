import React from "react";
import Stack from "@mui/material/Stack";
import type { Classification } from "@features/contests/contest";
import { ContestTypeFilter } from "./ContestTypeFilter";
import { SolvedStatus, SolvedStatusFilter } from "./SolvedStatusFilter";
import { PeriodFilterButton, PeriodWord } from "./PeriodFilter";
import { ResetFilterButton } from "@features/contests/components/ResetFilter";
import { ViewFilter } from "@features/contests/components/ViewFilter";
import { Box } from "@mui/material";

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
      <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ py: 1 }}>
        <Box sx={{ py: 0.5 }}>
          <ContestTypeFilter
            classification={classification}
            setClassification={setClassification}
          />
        </Box>
        <Box sx={{ py: 0.5 }}>
          <PeriodFilterButton period={period} setPeriod={setPeriod} />
        </Box>

        <Box sx={{ py: 0.5 }}>
          <SolvedStatusFilter
            solvedStatus={solvedStatus}
            setSolvedStatus={setSolvedStatus}
          />
        </Box>
        <Box sx={{ py: 0.5 }}>
          <ViewFilter
            showDifficulty={showDifficulty}
            reverse={reverse}
            toggleShowDifficulty={toggleShowDifficulty}
            toggleReverse={toggleReverse}
          />
        </Box>
        <Box sx={{ py: 0.5 }}>
          <ResetFilterButton
            setClassification={setClassification}
            setPeriod={setPeriod}
            setSolvedStatus={setSolvedStatus}
          />
        </Box>
      </Stack>
    );
  }
);
