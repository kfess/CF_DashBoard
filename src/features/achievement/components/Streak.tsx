import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import { StreakSum } from "@features/achievement/components/StreakSum";
import { CurrentStreak } from "@features/achievement/components/CurrentStreak";
import { LongestStreak } from "@features/achievement/components/LongestStreak";

type Props = { allSubmissions: Submission[]; acSubmissions: Submission[] };

export const Streak: React.FC<Props> = ({ allSubmissions, acSubmissions }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Streak Count
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        mb={3}
        spacing={2}
      >
        <StreakSum submissions={acSubmissions} title="AC Streak Sum" />
        <CurrentStreak submissions={acSubmissions} title="Current AC Streak" />
        <LongestStreak submissions={acSubmissions} title="Longest AC Streak" />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        my={2}
      >
        <StreakSum submissions={allSubmissions} title="Streak Sum" />
        <CurrentStreak submissions={allSubmissions} title="Current Streak" />
        <LongestStreak submissions={allSubmissions} title="Longest Streak" />
      </Stack>
    </Box>
  );
};
