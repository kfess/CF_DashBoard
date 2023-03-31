import React from "react";
import Stack from "@mui/material/Stack";
import type { Classification } from "@features/contests/contest";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { getColorCodeFromClassification } from "@features/color/ratingColor";
import { DeletableChip } from "@features/ui/component/Chip";
import type { PeriodWord } from "./PeriodFilter";
import type { SolvedStatus } from "./SolvedStatusFilter";

type Props = {
  classification: Classification;
  setDefaultClassification: () => void;
  period: PeriodWord;
  setPeriod: (arg: PeriodWord) => void;
  solvedStatus: SolvedStatus;
  setSolvedStatus: (arg: SolvedStatus) => void;
};

export const FilterChips: React.FC<Props> = (props: Props) => {
  const {
    classification,
    setDefaultClassification,
    period,
    setPeriod,
    solvedStatus,
    setSolvedStatus,
  } = props;

  const [startColor, endColor] = getColorCodeFromClassification(classification);

  return (
    <Stack direction="row" spacing={{ x: 1, y: 1 }}>
      {classification !== "All" && (
        <DeletableChip
          label={classification}
          onDelete={setDefaultClassification}
          icon={
            <>
              <ColoredCircle color={startColor} />-
              <ColoredCircle color={endColor} />
            </>
          }
        />
      )}
      {period !== "All Period" && (
        <DeletableChip
          label={period}
          onDelete={() => {
            setPeriod("All Period");
          }}
        />
      )}
      {solvedStatus !== "All Contests" && (
        <DeletableChip
          label={solvedStatus}
          onDelete={() => {
            setSolvedStatus("All Contests");
          }}
        />
      )}
    </Stack>
  );
};
