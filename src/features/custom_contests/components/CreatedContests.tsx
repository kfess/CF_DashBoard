import React from "react";

export const createdContestTypes = [
  "Running",
  "Upcoming",
  "Finished",
  "Personal",
] as const;
type CreatedContestType = typeof createdContestTypes[number];

type Props = { contestType: CreatedContestType };

export const CreatedContests: React.FC<Props> = (props: Props) => {
  const { contestType } = props;

  return <></>;
};
