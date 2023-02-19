import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Problem } from "@features/problems/problem";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { SolutionLink } from "./SolutionLink";

type Props = { problem: Problem };

export const ProblemsTableRow: React.FC<Props> = (props: Props) => {
  const { problem } = props;

  return (
    <TableRow>
      <TableCell>
        <ContestLink
          contestId={problem.contestId ?? 0} // need to change!
          contestName={problem.contestName ?? "unknown"} // need to change!
        />
      </TableCell>
      <TableCell>
        <ProblemLink
          contestId={problem.contestId ?? 0} // need to change!
          contestName={problem.contestName ?? "unknown"} // need to change!
          problemId={problem.index}
          problemName={problem.name}
          difficulty={problem.rating}
          showDifficulty={true}
        />
      </TableCell>
      <TableCell>{problem.rating}</TableCell>
      <TableCell>{}</TableCell>
      <TableCell>
        <SolutionLink />
      </TableCell>
    </TableRow>
  );
};
