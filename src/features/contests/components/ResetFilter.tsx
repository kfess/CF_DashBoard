import React from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import type { Classification } from "@features/contests/contest";
import { SolvedStatus } from "./SolvedStatusFilter";
import { PeriodWord } from "./PeriodFilter";
import { Button } from "@features/ui/component/Button";
import { useURLQuery } from "@hooks/useQueryParams";

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
  const { setURLQuery } = useURLQuery();

  const onClickReset = () => {
    setClassification("All");
    setPeriod("All Period");
    setSolvedStatus("All Contests");
    setURLQuery({
      classification: undefined,
      period: undefined,
      contestSolvedStatus: undefined,
    });
  };

  return (
    <Button onClick={onClickReset} startIcon={<ReplayIcon />}>
      Reset
    </Button>
  );
};
