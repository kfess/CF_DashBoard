import React from "react";
import type { Submission } from "@features/submission/submission";
import { isACSubmission, uniqueDateSet } from "../processSubmission";

type Props = { submissions: Submission[] };

export const StreakSum: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACDate = uniqueDateSet(ACSubmissions);

  return (
    <>
      <div>Streak Sum</div>
      <div>{uniqueACDate.size}</div>
    </>
  );
};
