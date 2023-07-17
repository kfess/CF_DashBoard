import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Submission } from "@features/submission/submission";
import {
  ACStreakSum,
  StreakSum,
} from "@features/achievement/components/StreakSum";
import { CurrentStreak } from "@features/achievement/components/CurrentStreak";
import {
  LongestACStreak,
  LongestStreak,
} from "@features/achievement/components/LongestStreak";
import { isACSubmission } from "../processSubmission";

type Props = { submissions: Submission[] };

export const Streak: React.FC<Props> = ({ submissions }) => {
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
          <ACStreakSum submissions={submissions} />
          <CurrentStreak
            submissions={submissions}
            filterFunc={isACSubmission}
            title="Current AC Streak"
          />
          <LongestACStreak submissions={submissions} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <StreakSum submissions={submissions} />
          <CurrentStreak
            submissions={submissions}
            filterFunc={() => true}
            title="Current Streak"
          />
          <LongestStreak submissions={submissions} />
        </Box>
      </Box>
    </Box>
  );
};
