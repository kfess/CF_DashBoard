import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  filterUniqueSubmissions,
  sumSubmissionsRating,
} from "@features/achievement/processSubmission";

type Props = { submissions: Submission[] };

export const TotalRatingSum: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACSubmissions = filterUniqueSubmissions(ACSubmissions);
  const sum = sumSubmissionsRating(uniqueACSubmissions) ?? 0;

  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h6" gutterBottom>
        Rated Point Sum
      </Typography>
      <Typography variant="h4" sx={{ color: "success.main" }}>
        {sum.toLocaleString()}{" "}
        <Typography variant="body2" color="text.secondary" component="span">
          points
        </Typography>
      </Typography>
    </Box>
  );
};
