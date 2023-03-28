import React from "react";
import { CF_CONTEST_URL } from "@constants/url";

type Props = {
  readonly contestId: number;
  readonly contestName: string;
};

export const ContestLink: React.FC<Props> = ({ contestId, contestName }) => {
  return (
    <a
      href={`${CF_CONTEST_URL}/${contestId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {contestName}
    </a>
  );
};
