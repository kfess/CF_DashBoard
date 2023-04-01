import React from "react";
import { Button } from "@features/ui/component/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import type { Classification } from "@features/contests/contest";
import { SolvedStatus } from "@features/problems/components/SolvedStatusFilter";

type Props = {
  setClassification: (arg: Classification) => void;
  setSolvedStatus: (arg: SolvedStatus) => void;
  removeAllTags: () => void;
  setLowerDifficulty: (arg: number) => void;
  setUpperDifficulty: (arg: number) => void;
};

export const ResetFilterButton: React.FC<Props> = (props: Props) => {
  const {
    setClassification,
    setSolvedStatus,
    removeAllTags,
    setLowerDifficulty,
    setUpperDifficulty,
  } = props;

  const onClickReset = () => {
    setClassification("All");
    setSolvedStatus("All Problems");
    removeAllTags();
    setLowerDifficulty(0);
    setUpperDifficulty(5000);
  };

  return (
    <Button onClick={onClickReset} startIcon={<ReplayIcon />}>
      Reset
    </Button>
  );
};
