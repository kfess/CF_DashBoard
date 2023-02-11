import React from "react";
import type { Submission } from "@features/submission/submission";
import { isACSubmission, filterUniqueSubmissions } from "../processSubmission";

type Props = { submissions: Submission[] };

export const UniqueACCount: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const ACSubmissions = submissions.filter(isACSubmission);
  const uniqueACSubmissions = filterUniqueSubmissions(ACSubmissions);

  return (
    <>
      <div>Accepted</div>
      <div>{uniqueACSubmissions.length}</div>
    </>
  );
};
