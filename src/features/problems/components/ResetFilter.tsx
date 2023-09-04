import React from "react";
import { __Button } from "@features/ui/component/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import type { Classification } from "@features/contests/contest";
import { SolvedStatus } from "@features/problems/components/SolvedStatusFilter";
import { useURLQuery } from "@hooks/useQueryParams";

type Props = {
  setClassification: (arg: Classification) => void;
  setSolvedStatus: (arg: SolvedStatus) => void;
  removeAllTags: () => void;
  setLowerDifficulty: (arg: number) => void;
  setUpperDifficulty: (arg: number) => void;
  setShowTags: (arg: boolean) => void;
};

export const ResetFilterButton: React.FC<Props> = ({
  setClassification,
  setSolvedStatus,
  removeAllTags,
  setLowerDifficulty,
  setUpperDifficulty,
  setShowTags,
}) => {
  const { setURLQuery } = useURLQuery();

  const onClickReset = () => {
    setClassification("All");
    setSolvedStatus("All Problems");
    removeAllTags();
    setLowerDifficulty(0);
    setUpperDifficulty(5000);
    setShowTags(false);
    setURLQuery({
      classification: undefined,
      solvedStatus: undefined,
      tags: undefined,
      fromDifficulty: undefined,
      toDifficulty: undefined,
    });
  };

  return (
    <__Button
      onClick={onClickReset}
      startIcon={<ReplayIcon />}
      color="secondary"
    >
      Reset
    </__Button>
  );
};
