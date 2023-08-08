import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import { StreakSum } from "@features/achievement/components/StreakSum";
import { CurrentStreak } from "@features/achievement/components/CurrentStreak";
import { LongestStreak } from "@features/achievement/components/LongestStreak";

type Props = { allSubmissions: Submission[]; acSubmissions: Submission[] };

export const Streak: React.FC<Props> = ({ allSubmissions, acSubmissions }) => {
  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h6" gutterBottom>
        Streak Count
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            marginBottom: 2,
          }}
        >
          <StreakSum submissions={acSubmissions} title="AC Streak Sum" />
          <CurrentStreak
            submissions={acSubmissions}
            title="Current AC Streak"
          />
          <LongestStreak
            submissions={acSubmissions}
            title="Longest AC Streak"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <StreakSum submissions={allSubmissions} title="Streak Sum" />
          <CurrentStreak submissions={allSubmissions} title="Current Streak" />
          <LongestStreak submissions={allSubmissions} title="Longest Streak" />
        </Box>
      </Box>
    </Box>
  );
};
