import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import type { ReshapedProblem } from "@features/problems/problem";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { useThemeContext } from "@features/color/themeColor.hook";

type Props = {
  contestId: number;
  contestName: string;
  problems: ReshapedProblem[];
  showDifficulty: boolean;
  solvedSet?: Set<string>;
  attemptedSet?: Set<string>;
};

export const ContestTableRow: React.FC<Props> = React.memo((props: Props) => {
  const {
    contestId,
    contestName,
    problems,
    showDifficulty,
    solvedSet,
    attemptedSet,
  } = props;

  const { theme } = useThemeContext();

  return (
    <TableRow key={contestId} hover>
      <TableCell component="th" scope="row">
        <ContestLink contestId={contestId} contestName={contestName} />
      </TableCell>
      {problems.map((problem) => (
        <TableCell key={problem.index}>
          {problem.indexedProblems.map((p) => (
            <div
              css={{
                backgroundColor: solvedSet?.has(contestId + p.index)
                  ? theme.colors.acColor
                  : "",
              }}
            >
              <ProblemLink
                showDifficulty={showDifficulty}
                contestId={contestId}
                contestName={contestName}
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
