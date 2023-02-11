import * as dayjs from "dayjs";
import React from "react";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  uniqueDateSet,
} from "@features/achievement/processSubmission";

type Props = { submissions: Submission[] };

export const LongestStreak: React.FC<Props> = (props: Props) => {
  const { submissions } = props;

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
    <>
      <div>Longest Streak</div>
      <div>{maxStreak}</div>
    </>
  );
};
