import React, { useMemo } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import type { ReshapedProblem } from "@features/problems/problem";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { useThemeContext } from "@features/color/themeColor.hook";
import { getProblemKey } from "@features/problems/utils";
import { Classification } from "@features/contests/contest";
import { calcSolvedStatusWithIdxes } from "@features/contests/utils/solvedStatus";
import type { SolvedStatus } from "@features/contests/components/SolvedStatusFilter";

type Props = {
  readonly userId?: string;
  readonly contestId: number;
  readonly contestName: string;
  readonly classification: Classification;
  readonly problemIdxes: string[];
  readonly problems: ReshapedProblem[];
  readonly showDifficulty: boolean;
  readonly solvedStatus: SolvedStatus;
  readonly solvedSet?: Set<string>;
  readonly attemptedSet?: Set<string>;
};

export const ContestTableRow: React.FC<Props> = React.memo(
  ({
    userId,
    contestId,
    contestName,
    classification,
    problemIdxes,
    problems,
    showDifficulty,
    solvedStatus,
    solvedSet,
    attemptedSet,
  }) => {
    const { theme } = useThemeContext();

    const problemMap = useMemo(() => {
      const map: Record<string, ReshapedProblem> = {};
      problems.forEach((problem) => {
        map[problem.index] = problem;
      });
      return map;
    }, [problems]);

    const userSolvedStatus: SolvedStatus = useMemo(() => {
      if (!userId) return "All Contests";
      return calcSolvedStatusWithIdxes(
        problemIdxes,
        problemMap,
        solvedSet,
        contestId
      );
    }, [problemIdxes, problemMap, solvedSet, contestId]);

    const rowColor = useMemo(() => {
      return userSolvedStatus === "Completed" ? theme.colors.acColor : "";
    }, [problemIdxes, problemMap, solvedSet, contestId, theme.colors.acColor]);

    const cellColors = useMemo(() => {
      return problemIdxes.map((idx) => {
        const problem = problemMap[idx];
        const indexedProblems = problem?.indexedProblems || [];
        return indexedProblems.map((p) => {
          const problemKey = getProblemKey(p);
          const isSolved = solvedSet?.has(problemKey);
          const isAttempted = attemptedSet?.has(problemKey);
          return isSolved
            ? theme.colors.acColor
            : isAttempted
            ? theme.colors.waColor
            : "";
        });
      });
    }, [problemIdxes, problemMap, solvedSet, contestId, theme.colors]);

    // これではバグる
    // if (
    //   userId &&
    //   solvedStatus !== "All Contests" &&
    //   userSolvedStatus !== solvedStatus
    // ) {
    //   return null;
    // }

    return (
      <TableRow key={contestId} hover>
        <TableCell
          component="th"
          scope="row"
          css={{
            borderRight: "1px solid rgba(224, 224, 224, 1)",
            backgroundColor: rowColor,
          }}
        >
          <ContestLink
            contestId={contestId}
            contestName={contestName}
            classification={classification}
          />
        </TableCell>
        {problemIdxes.map((idx, cellIdx) => {
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
                  const backgroundColor = cellColors[cellIdx][index];
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
  }
);
