import React from "react";
import TableRow from "@mui/material/TableRow";
import type { Problem } from "@features/problems/problem";
import { ProblemLinkCell } from "@features/problems/components/ProblemLinkCell";

type Props = {
  contestId: string;
  problems: Problem[];
};

export const Contest: React.FC<Props> = (props: Props) => {
  const { contestId, problems } = props;

  return (
    <TableRow key={contestId}>
      {problems.map((problem) => (
        <>{}</>
      ))}
    </TableRow>
  );
};
