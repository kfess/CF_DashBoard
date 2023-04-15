import React, { useMemo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { RecommendLevel } from "@features/recommendation/recommend";
import { recommendDifficultyRange } from "@features/recommendation/helper";
import type { Problem } from "@features/problems/problem";
import { ProblemsTableRow } from "@features/problems/components/ProblemsTableRow";
import { getRandomElements } from "@helpers/random";

type Props = {
  level: RecommendLevel;
  userRating?: number;
  problems: Problem[];
};

export const RecommendProblemsTable: React.FC<Props> = (props: Props) => {
  const { userRating, level, problems } = props;
  const [lowerDifficulty, upperDifficulty] = recommendDifficultyRange(
    userRating,
    level
  );

  const filteredProblems = useMemo(() => {
    return getRandomElements(
      problems.filter(
        (problem) =>
          (problem.rating ?? 0) >= lowerDifficulty &&
          (problem.rating ?? 0) <= upperDifficulty
      ),
      20
    );
  }, [problems]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Problem</TableCell>
                <TableCell>Contest</TableCell>
                <TableCell>Difficulty</TableCell>
                <TableCell>Solved Count</TableCell>
                <TableCell>Solution</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProblems
                .sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0))
                .map((problem) => (
                  <ProblemsTableRow
                    key={problem.contestId + problem.index}
                    problem={problem}
                    showTags={false}
                    backgroundColor=""
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
