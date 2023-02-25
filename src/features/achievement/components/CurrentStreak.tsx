import * as dayjs from "dayjs";
import React from "react";
import Stack from "@mui/material/Stack";
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
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <div>
        <strong>Current Streak</strong>
      </div>
      <div>
        <strong>{currentStreak}</strong>{" "}
        <span css={{ fontSize: "14px", color: "gray" }}>
          {currentStreak > 1 ? "days" : "day"}
        </span>
      </div>
    </Stack>
  );
};
