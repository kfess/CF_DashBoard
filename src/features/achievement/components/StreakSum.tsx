import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import { uniqueDateSet } from "../processSubmission";

const _calcStreakSum = (submissions: Submission[]) => {
  const uniqueDate = uniqueDateSet(submissions);
  return uniqueDate.size;
};

type Props = {
  readonly submissions: Submission[];
  readonly title: string;
};

export const StreakSum: React.FC<Props> = ({ submissions, title }) => {
  const streakSum = useMemo(() => _calcStreakSum(submissions), [submissions]);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body1" color="text.secondary">
        {title}
      </Typography>
      <Typography
        variant="h4"
        sx={{ color: (theme) => theme.palette.primary.main }}
      >
        {streakSum.toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {streakSum > 1 ? "days" : "day"}
      </Typography>
    </Box>
  );
};
