import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import {
  filterUniqueSubmissions,
  sumSubmissionsRating,
} from "@features/achievement/processSubmission";
import { useTheme } from "@mui/material";

const _calcRatingSum = (submissions: Submission[]): number => {
  const uniqueSubmissions = filterUniqueSubmissions(submissions);
  const sum = sumSubmissionsRating(uniqueSubmissions) || 0;
  return sum;
};

type Props = { readonly submissions: Submission[] };

export const TotalRatingSum: React.FC<Props> = ({ submissions }) => {
  const theme = useTheme();

  const ratingSum = useMemo(() => _calcRatingSum(submissions), [submissions]);

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" gutterBottom>
        Rated Point Sum
      </Typography>
      <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
        {ratingSum.toLocaleString()}{" "}
        <Typography variant="body2" color="text.secondary" component="span">
          points
        </Typography>
      </Typography>
    </Box>
  );
};
