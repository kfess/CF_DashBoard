import React from "react";
import type { Contest } from "@features/contests/contest";
import { ContestTableRow } from "@features/contests/components/ContestTableRow";

type Props = {
  contests: Contest[];
};

export const ContestsTable: React.FC<Props> = (props: Props) => {
  const { contests } = props;
  return (
    <>
      {contests.map((contest) => (
        <ContestTableRow
          contestId={contest.id}
          contestName={contest.name}
          problems={contest.problems}
        />
      ))}
    </>
  );
};
