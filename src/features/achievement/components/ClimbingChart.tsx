import React from "react";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  groupbyRatingColor,
} from "@features/achievement/processSubmission";

type Props = { submissions: Submission[]; isColored: boolean };

export const ClimbingChart: React.FC<Props> = (props: Props) => {
  const { submissions, isColored } = props;
  const ACSubmissions = submissions.filter(isACSubmission);
  const grouped = groupbyRatingColor(ACSubmissions);
  console.log(grouped);

  return <></>;
};
