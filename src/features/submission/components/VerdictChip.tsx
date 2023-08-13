import React from "react";
import Chip from "@mui/material/Chip";
import type { Verdict } from "@features/submission/submission";
import { verdictMap } from "@helpers/verdict";

type Props = { verdict?: Verdict };

export const VerdictChip: React.FC<Props> = ({ verdict }) => {
  return (
    <Chip
      label={verdict ? verdictMap[verdict] : verdictMap["UNKNOWN"]}
      color={
        verdict
          ? verdict === "OK"
            ? "success"
            : verdict === "TESTING"
            ? "default"
            : "warning"
          : "default"
      }
      variant="filled"
      size="small"
      onClick={() => {}}
    />
  );
};
