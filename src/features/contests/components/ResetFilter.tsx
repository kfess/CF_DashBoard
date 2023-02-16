import React from "react";
import Button from "@mui/material/Button";
import type { Classification } from "@features/contests/contest";
import { SolvedStatus } from "./SolvedStatusFilter";
import { PeriodWord } from "./PeriodFilter";

type Props = {
  setClassification: (arg: Classification) => void;
  setPeriod: (arg: PeriodWord) => void;
  setSolvedStatus: (arg: SolvedStatus) => void;
};

export const ResetFilterButton: React.FC<Props> = (props: Props) => {
  const { setClassification, setPeriod, setSolvedStatus } = props;

  const onClickReset = () => {
    setClassification("All");
    setPeriod("All Period");
    setSolvedStatus("All Contests");
  };

  return (
    <Button
      onClick={onClickReset}
      color="error"
      css={{ textTransform: "none" }}
    >
      Reset
    </Button>
  );
};
