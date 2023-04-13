import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Problem } from "@features/problems/problem";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { SolutionLink } from "./SolutionLink";
import { getColorCodeFromRating } from "@features/color/ratingColor";
import { Chip_ } from "@features/ui/component/Chip";

type Props = { problem: Problem; showTags: boolean };

export const ProblemsTableRow: React.FC<Props> = (props: Props) => {
  const { problem, showTags } = props;

  return (
    <TableRow>
      <TableCell>
        <ProblemLink
          contestId={problem.contestId ?? 0} // need to change!
          contestName={problem.contestName ?? "unknown"} // need to change!
          problemId={problem.index}
          problemName={problem.name}
          difficulty={problem.rating}
          showDifficulty={true}
          solvedCount={problem.solvedCount}
        />
        <div>
          {showTags &&
            problem.tags.length > 0 &&
            problem.tags.map((tag) => <Chip_ label={tag} />)}
        </div>
      </TableCell>
      <TableCell>
        <ContestLink
          contestId={problem.contestId ?? 0} // need to change!
          contestName={problem.contestName ?? "unknown"} // need to change!
        />
      </TableCell>
      <TableCell>
        <span css={{ color: getColorCodeFromRating(problem.rating) }}>
          {problem.rating ?? "no data"}
        </span>
      </TableCell>
      <TableCell>{problem.solvedCount ?? "no data"}</TableCell>
      <TableCell>
        <SolutionLink />
      </TableCell>
    </TableRow>
  );
};
