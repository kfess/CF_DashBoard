import React from "react";
import type { Submission } from "@features/submission/submission";

type Props = { submissions: Submission[]; isColored: boolean };

export const ClimbingChart: React.FC<Props> = (props: Props) => {
  const { submissions, isColored } = props;

  return <></>;
};
