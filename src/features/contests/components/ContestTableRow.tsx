import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import type { ReshapedProblem } from "@features/problems/problem";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { useThemeContext } from "@features/color/themeColor.hook";
import { isAllProblemsSolved } from "@features/contests/helper";
import { getProblemKey } from "@features/problems/utils";

type Props = {
  contestId: number;
  contestName: string;
  problemIdxes: string[];
  problems: ReshapedProblem[];
  showDifficulty: boolean;
  solvedSet?: Set<string>;
  attemptedSet?: Set<string>;
};

export const ContestTableRow: React.FC<Props> = React.memo((props: Props) => {
  const {
    contestId,
    contestName,
    problemIdxes,
    problems,
    showDifficulty,
    solvedSet,
    attemptedSet,
  } = props;

  const { theme } = useThemeContext();

  const problemMap: Record<string, ReshapedProblem> = {};
  problems.forEach((problem) => {
    problemMap[problem.index] = problem;
  });

  return (
    <TableRow key={contestId} hover>
      <TableCell
        component="th"
        scope="row"
        css={{
          borderRight: "1px solid rgba(224, 224, 224, 1)",
          backgroundColor: isAllProblemsSolved(
            problemIdxes,
            problemMap,
            solvedSet,
            contestId
          )
            ? theme.colors.acColor
            : "",
        }}
      >
        <ContestLink contestId={contestId} contestName={contestName} />
      </TableCell>
      {problemIdxes.map((idx) => {
        const problem = problemMap[idx];
        const indexedProblems = problem?.indexedProblems || [];
        return (
          <TableCell
            key={idx}
            css={{
              padding: 0,
              borderRight: "1px solid rgba(224, 224, 224, 1)",
            }}
          >
            <div
              css={{
                display: "grid",
                gridTemplateRows:
                  indexedProblems.length > 1
                    ? `repeat(${indexedProblems.length}, 1fr)`
                    : "1fr",
                width: "100%",
                height: "100%",
              }}
            >
              {indexedProblems.map((p, index) => {
                const problemKey = getProblemKey(contestId, p.index, p.name);
                const isSolved = solvedSet?.has(problemKey);
                const isAttempted = attemptedSet?.has(problemKey);
                const backgroundColor = isSolved
                  ? theme.colors.acColor
                  : isAttempted
                  ? theme.colors.waColor
                  : "";

                return (
                  <div
                    key={p.index}
                    css={{
                      backgroundColor,
                      gridRow: index + 1,
                      padding: theme.spacing(1),
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ProblemLink
                      showDifficulty={showDifficulty}
                      contestId={contestId}
                      contestName={contestName}
                      problemId={p.index}
                      problemName={p.name}
                      difficulty={p.rating}
                      solvedCount={p.solvedCount}
                    />
                  </div>
                );
              })}
            </div>
          </TableCell>
        );
      })}
    </TableRow>
  );
});
