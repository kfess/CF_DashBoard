import React from "react";
import Stack from "@mui/material/Stack";
import type { Submission } from "@features/submission/submission";
import { StreakSum } from "@features/achievement/components/StreakSum";
import { CurrentStreak } from "@features/achievement/components/CurrentStreak";
import { LongestStreak } from "@features/achievement/components/LongestStreak";

type Props = { submissions: Submission[] };

export const Streak: React.FC<Props> = (props: Props) => {
  const { submissions } = props;

  return (
    <>
      <div>
        <strong>Streak Count</strong>
      </div>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          m: 1,
        }}
      >
        <StreakSum submissions={submissions} />
        <CurrentStreak submissions={submissions} />
        <LongestStreak submissions={submissions} />
      </Stack>
    </>
  );
};
