import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import type { Problem } from "@features/problems/problem";
import { ProblemLinkCell } from "@features/problems/components/ProblemLinkCell";

type Props = {
  contestId: number;
  contestName: string;
  problems: Problem[];
};

export const ContestTableRow: React.FC<Props> = (props: Props) => {
  const { contestId, contestName, problems } = props;

  return (
    <TableRow key={contestId}>
      <TableCell component="th" scope="row">
        {contestName}
      </TableCell>
      {problems.map((problem) => (
        <TableCell key={problem.index + "_" + problem.name}>
          <ProblemLinkCell
            showDifficulty={true}
            contestId={contestId}
            problemId={problem.index}
            problemName={problem.name}
            difficulty={problem.rating}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
