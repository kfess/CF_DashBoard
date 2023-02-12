import React from "react";
import { AreaChart } from "recharts";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  groupbyRatingColor,
  groupbyDate,
} from "@features/achievement/processSubmission";

type Props = { submissions: Submission[]; isColored: boolean };

export const ClimbingChart: React.FC<Props> = (props: Props) => {
  const { submissions, isColored } = props;

  const ACSubmissions = submissions
    .filter(isACSubmission)
    .sort((a, b) => a.creationTimeSeconds - b.creationTimeSeconds);

  const gDateSubmissions = groupbyDate(ACSubmissions);

  // whithout rating color
  const noColoredCount = gDateSubmissions.map((g) => {
    const [date, submissions] = g;
    return { date, count: submissions.length };
  });

  // whit rating color
  const coloredCount = gDateSubmissions.map((g) => {
    const [date, submissions] = g;
    const gColorSubmissions = groupbyRatingColor(submissions);
    const colorCount = gColorSubmissions.reduce((obj, g) => {
      const [color, submissions] = g;
      return { ...obj, [color]: submissions.length };
    }, {});

    return { date, ...colorCount };
  });

  console.log(coloredCount);

  return <></>;
};
