import React from "react";
import { CustomContest } from "@features/custom_contests/customContest";

type Props = {
  customContest: CustomContest;
};

export const ContestDetail: React.FC<Props> = (props: Props) => {
  const { customContest } = props;

  return <>{customContest.contestId}</>;
};
