import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import { uniqueDateSet } from "../processSubmission";

const _calcStreakSum = (
  submissions: Submission[],
  filterFunc: (submission: Submission) => boolean // parent componentで useCallback して渡す
) => {
  const filteredSubmissions = submissions.filter(filterFunc);
  const uniqueDate = uniqueDateSet(filteredSubmissions);
  return uniqueDate.size;
};

type Props = {
  submissions: Submission[];
  filterFunc: (submission: Submission) => boolean;
  title: string;
};

export const StreakSum: React.FC<Props> = ({
  submissions,
  filterFunc,
  title,
}) => {
  const streakSum = useMemo(
    () => _calcStreakSum(submissions, filterFunc),
    [submissions, filterFunc]
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body1" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4" sx={{ color: "success.main" }}>
        {streakSum.toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {streakSum > 1 ? "days" : "day"}
      </Typography>
    </Box>
  );
};
