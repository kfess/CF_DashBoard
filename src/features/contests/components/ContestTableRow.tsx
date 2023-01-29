import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import type { ReshapedProblem } from "@features/problems/problem";
import { ProblemLink } from "@features/problems/components/ProblemLink";

type Props = {
  contestId: number;
  contestName: string;
  problems: ReshapedProblem[];
  showDifficulty: boolean;
};

export const ContestTableRow: React.FC<Props> = React.memo((props: Props) => {
  const { contestId, contestName, problems, showDifficulty } = props;

  return (
    <TableRow key={contestId}>
      <TableCell component="th" scope="row">
        {contestName}
      </TableCell>
      {problems.map((problem) => (
        <TableCell key={problem.index}>
          {problem.indexedProblems.map((p) => (
            <div>
              <ProblemLink
                showDifficulty={showDifficulty}
                contestId={contestId}
                problemId={p.index}
                problemName={p.name}
                difficulty={p.rating}
              />
            </div>
          ))}
        </TableCell>
      ))}
    </TableRow>
  );
});
