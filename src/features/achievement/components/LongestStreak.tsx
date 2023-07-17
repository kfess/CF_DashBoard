import dayjs from "dayjs";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  uniqueDateSet,
} from "@features/achievement/processSubmission";

type Props = { submissions: Submission[] };

export const LongestACStreak: React.FC<Props> = ({ submissions }) => {
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACDate = uniqueDateSet(ACSubmissions);
  const sortedDate = Array.from(uniqueACDate).sort((a, b) =>
    b.localeCompare(a)
  );

  const maxStreak =
    sortedDate.length > 0
      ? Math.max(
          ...sortedDate
            .slice(1)
            .map((d, i) =>
              dayjs(sortedDate[i]).diff(dayjs(d), "day") === 1 ? 1 : 0
            )
            .reduce(
              (y, x) => {
                return x === 1 ? [...y, x + y[y.length - 1]] : [...y, x];
              },
              [0]
            )
        ) + 1
      : 0;

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body1" color="text.secondary">
        Max AC Streak
      </Typography>
      <Typography variant="h4" sx={{ color: "success.main" }}>
        {maxStreak.toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {maxStreak > 1 ? "days" : "day"}
      </Typography>
    </Box>
  );
};

export const LongestStreak: React.FC<Props> = ({ submissions }) => {
  const uniqueACDate = uniqueDateSet(submissions);
  const sortedDate = Array.from(uniqueACDate).sort((a, b) =>
    b.localeCompare(a)
  );

  const maxStreak =
    sortedDate.length > 0
      ? Math.max(
          ...sortedDate
            .slice(1)
            .map((d, i) =>
              dayjs(sortedDate[i]).diff(dayjs(d), "day") === 1 ? 1 : 0
            )
            .reduce(
              (y, x) => {
                return x === 1 ? [...y, x + y[y.length - 1]] : [...y, x];
              },
              [0]
            )
        ) + 1
      : 0;

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body1" color="text.secondary">
        Max Streak
      </Typography>
      <Typography variant="h4" sx={{ color: "success.main" }}>
        {maxStreak.toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {maxStreak > 1 ? "days" : "day"}
      </Typography>
    </Box>
  );
};
