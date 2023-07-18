import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  filterUniqueSubmissions,
  sumSubmissionsRating,
} from "@features/achievement/processSubmission";

const _calcRatingSum = (submissions: Submission[]) => {
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACSubmissions = filterUniqueSubmissions(ACSubmissions);
  const sum = sumSubmissionsRating(uniqueACSubmissions) ?? 0;
  return sum;
};

type Props = { readonly submissions: Submission[] };

export const TotalRatingSum: React.FC<Props> = ({ submissions }) => {
  const ratingSum = useMemo(() => _calcRatingSum(submissions), [submissions]);

  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h6" gutterBottom>
        Rated Point Sum
      </Typography>
      <Typography variant="h4" sx={{ color: "success.main" }}>
        {ratingSum.toLocaleString()}{" "}
        <Typography variant="body2" color="text.secondary" component="span">
          points
        </Typography>
      </Typography>
    </Box>
  );
};
