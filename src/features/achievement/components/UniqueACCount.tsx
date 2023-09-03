import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import { filterUniqueSubmissions } from "@features/achievement/processSubmission";
import { isLastMonth, isLastYear } from "@helpers/date";
import { pluralize } from "@helpers/index";

const _filterSubmissions = (
  submissions: Submission[],
  filterFunc: (time: number) => boolean
) => {
  const uniqueFilteredSubmissions = filterUniqueSubmissions(submissions);
  return uniqueFilteredSubmissions.filter((sub) =>
    filterFunc(sub.creationTimeSeconds)
  );
};

type Props = { readonly submissions: Submission[] };

export const UniqueACCount: React.FC<Props> = ({ submissions }) => {
  const uniqueACSubs = useMemo(
    () => _filterSubmissions(submissions, () => true),
    [submissions]
  );
  const lastYearUniqueACSubs = useMemo(
    () => _filterSubmissions(submissions, isLastYear),
    [submissions]
  );
  const lastMonthUniqueACSubs = useMemo(
    () => _filterSubmissions(submissions, isLastMonth),
    [submissions]
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
          <Typography
            variant="h4"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {uniqueACSubs.length.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pluralize(uniqueACSubs.length, "problem")} solved
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            Last Year
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {lastYearUniqueACSubs.length.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pluralize(lastYearUniqueACSubs.length, "problem")} solved
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            Last Month
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {lastMonthUniqueACSubs.length.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pluralize(lastMonthUniqueACSubs.length, "problem")} solved
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
