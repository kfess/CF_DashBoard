import React from "react";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import type { Classification } from "@features/contests/contest";
import { SolvedStatus } from "@features/problems/components/SolvedStatusFilter";

type Props = {
  setClassification: (arg: Classification) => void;
  setSolvedStatus: (arg: SolvedStatus) => void;
  removeAllTags: () => void;
};

export const ResetFilterButton: React.FC<Props> = (props: Props) => {
  const { setClassification, setSolvedStatus, removeAllTags } = props;

  const onClickReset = () => {
    setClassification("All");
    setSolvedStatus("All Problems");
    removeAllTags();
  };

  return (
    <Button
      onClick={onClickReset}
      color="error"
      css={{ textTransform: "none" }}
      startIcon={<ReplayIcon fontSize="inherit" />}
    >
      Reset
    </Button>
  );
};
