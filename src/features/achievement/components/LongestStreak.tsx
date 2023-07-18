import dayjs from "dayjs";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import { uniqueDateSet } from "@features/achievement/processSubmission";

const _calcLongestStreak = (
  submissions: Submission[],
  filterFunc: (submission: Submission) => boolean
) => {
  const filteredSubmissions = submissions.filter(filterFunc);
  const uniqueACDate = uniqueDateSet(filteredSubmissions);
  const sortedDate = Array.from(uniqueACDate).sort((a, b) =>
    b.localeCompare(a)
  );

  let maxStreak = 0;
  let currentStreak = sortedDate.length > 0 ? 1 : 0;

  for (let i = 1; i < sortedDate.length; i++) {
    if (dayjs(sortedDate[i - 1]).diff(dayjs(sortedDate[i]), "day") === 1) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }
    maxStreak = Math.max(currentStreak, maxStreak);
  }
  return maxStreak;
};

type Props = {
  submissions: Submission[];
  filterFunc: (submission: Submission) => boolean;
  title: string;
};

export const LongestStreak: React.FC<Props> = ({
  submissions,
  filterFunc,
  title,
}) => {
  const maxStreak = _calcLongestStreak(submissions, filterFunc);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body1" color="text.secondary">
        {title}
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
