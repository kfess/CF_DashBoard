import React from "react";
import type { Submission } from "@features/submission/submission";
import {
  isACSubmission,
  filterUniqueSubmissions,
  sumSubmissionsRating,
} from "../processSubmission";

type Props = { submissions: Submission[] };

export const TotalRatingSum: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACSubmissions = filterUniqueSubmissions(ACSubmissions);
  const sum = sumSubmissionsRating(uniqueACSubmissions);

  return (
    <>
      <div>Rated Point Sum</div>
      <div>{sum}</div>
    </>
  );
};
