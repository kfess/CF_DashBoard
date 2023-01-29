import React from "react";
import { CF_CONTEST_URL } from "@constants/url";

type Props = {
  contestId: number;
  contestName: string;
};

export const ContestLink: React.FC<Props> = (props: Props) => {
  const { contestId, contestName } = props;

  return (
    <a
      href={[CF_CONTEST_URL, contestId].join("/")}
      target="_blank"
      rel="noopner noreferrer"
    >
      {contestName}
    </a>
  );
};
