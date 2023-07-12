import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  filterUniqueSubmissions,
} from "@features/achievement/processSubmission";
import { isLastMonth, isLastYear } from "@helpers/date";

type Props = { submissions: Submission[] };

export const UniqueACCount: React.FC<Props> = (props: Props) => {
  const { submissions } = props;

  const ACSubs = submissions.filter(isACSubmission);
  const uniqueACSubs = filterUniqueSubmissions(ACSubs);
  const lastYearUniqueACSubs = uniqueACSubs.filter((sub) =>
    isLastYear(sub.creationTimeSeconds)
  );
  const lastMonthYniqueACSubs = uniqueACSubs.filter((sub) =>
    isLastMonth(sub.creationTimeSeconds)
  );

  return (
    <Box
      sx={{
        padding: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Accepted Count
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 3 }}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            Total
          </Typography>
          <Typography variant="h4" sx={{ color: "success.main" }}>
            {uniqueACSubs.length.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {uniqueACSubs.length > 1 ? "problems" : "problem"} solved
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            Last Year
          </Typography>
          <Typography variant="h4" sx={{ color: "success.main" }}>
            {lastYearUniqueACSubs.length.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lastYearUniqueACSubs.length > 1 ? "problems" : "problem"} solved
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            Last Month
          </Typography>
          <Typography variant="h4" sx={{ color: "success.main" }}>
            {lastMonthYniqueACSubs.length.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lastMonthYniqueACSubs.length > 1 ? "problems" : "problem"} solved
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
