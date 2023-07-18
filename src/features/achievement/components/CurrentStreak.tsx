import dayjs from "dayjs";
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import { uniqueDateSet } from "@features/achievement/processSubmission";

const _calcCurrentStreak = (
  submissions: Submission[],
  filterFunc: (submission: Submission) => boolean // parent component で useCallback して渡す
): number => {
  const today = dayjs().format("YYYY/MM/DD");
  const yesterday = dayjs().subtract(1, "day").format("YYYY/MM/DD");

  const filteredSubmissions = submissions.filter(filterFunc);
  const uniqueDate = uniqueDateSet(filteredSubmissions);
  const sortedDate = Array.from(uniqueDate).sort((a, b) => b.localeCompare(a));

  let currentStreak = 0;
  sortedDate.find((date, i) => {
    if (i === 0 && date !== today && date !== yesterday) {
      return true;
    }
    if (
      i < sortedDate.length - 1 &&
      dayjs(date).diff(dayjs(sortedDate[i + 1]), "day") !== 1
    ) {
      return true;
    }
    currentStreak++;
    return false;
  });
  return currentStreak;
};

type Props = {
  readonly submissions: Submission[];
  readonly filterFunc: (submission: Submission) => boolean;
  readonly title: string;
};

export const CurrentStreak: React.FC<Props> = ({
  submissions,
  filterFunc,
  title,
}) => {
  const currentStreak = useMemo(
    () => _calcCurrentStreak(submissions, filterFunc),
    [submissions, filterFunc]
  );

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body1" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4" sx={{ color: "success.main" }}>
        {currentStreak.toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {currentStreak > 1 ? "days" : "day"}
      </Typography>
    </Box>
  );
};
