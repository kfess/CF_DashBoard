import React from "react";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  filterUniqueSubmissions,
} from "@features/achievement/processSubmission";

type Period = "Last year" | "Last Month" | "Last Week" | "Total";
type Props = { submissions: Submission[]; period: Period };

export const UniqueACCount: React.FC<Props> = (props: Props) => {
  const { submissions, period } = props;

  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACSubmissions = filterUniqueSubmissions(ACSubmissions);

  return (
    <>
      <div>Accepted</div>
      <div>{uniqueACSubmissions.length}</div>
    </>
  );
};
