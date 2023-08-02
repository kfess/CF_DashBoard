import React from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import type { Classification } from "@features/contests/contest";
import { SolvedStatus } from "./SolvedStatusFilter";
import { PeriodWord } from "./PeriodFilter";
import { Button } from "@features/ui/component/Button";

type Props = {
  setClassification: (arg: Classification) => void;
  setPeriod: (arg: PeriodWord) => void;
  setSolvedStatus: (arg: SolvedStatus) => void;
};

export const ResetFilterButton: React.FC<Props> = ({
  setClassification,
  setPeriod,
  setSolvedStatus,
}) => {
  const onClickReset = () => {
    setClassification("All");
    setPeriod("All Period");
    setSolvedStatus("All Contests");
  };

  return (
    <Button onClick={onClickReset} startIcon={<ReplayIcon />}>
      Reset
    </Button>
  );
};
