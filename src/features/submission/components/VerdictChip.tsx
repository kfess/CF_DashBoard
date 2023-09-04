import React from "react";
import { Chip } from "@features/ui/component/Chip";
import type { Verdict } from "@features/submission/submission";
import { verdicts } from "@features/submission/submission";

type Props = { readonly verdict?: Verdict };

export const VerdictChip: React.FC<Props> = ({ verdict }) => {
  return (
    <Chip
      label={verdict ? verdicts[verdict] : verdicts["UNKNOWN"]}
      color={
        verdict
          ? verdict === "OK"
            ? "success"
            : verdict === "TESTING"
            ? "default"
            : "warning"
          : "default"
      }
    />
  );
};
