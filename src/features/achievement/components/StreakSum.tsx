import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import { isACSubmission, uniqueDateSet } from "../processSubmission";

type Props = { submissions: Submission[] };

export const StreakSum: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACDate = uniqueDateSet(ACSubmissions);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body1" color="text.secondary">
        AC Streak Sum
      </Typography>
      <Typography variant="h4" sx={{ color: "success.main" }}>
        {uniqueACDate.size.toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {uniqueACDate.size > 1 ? "days" : "day"}
      </Typography>
    </Box>
  );
};
