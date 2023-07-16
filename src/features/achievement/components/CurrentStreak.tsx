import dayjs from "dayjs";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  uniqueDateSet,
} from "@features/achievement/processSubmission";

const today = dayjs().format("YYYY/MM/DD");
const yesterday = dayjs().subtract(1, "day").format("YYYY/MM/DD");

type Props = { submissions: Submission[] };

export const CurrentStreak: React.FC<Props> = (props: Props) => {
  const { submissions } = props;

  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACDate = uniqueDateSet(ACSubmissions);
  const sortedDate = Array.from(uniqueACDate).sort((a, b) =>
    b.localeCompare(a)
  );

  const currentStreak =
    sortedDate.length === 0 ||
    (sortedDate[0] !== today && sortedDate[0] !== yesterday)
      ? 0
      : sortedDate
          .slice(1)
          .map((d, i) => dayjs(sortedDate[i]).diff(dayjs(d), "day"))
          .findIndex((n) => n !== 1) + 1;

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="body1" color="text.secondary">
        Current AC Streak
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
