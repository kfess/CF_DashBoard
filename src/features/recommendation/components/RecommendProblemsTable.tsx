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
import { usePagination } from "@hooks/index";
import { TablePagination } from "@features/ui/component/TablePagination";

type Props = {
  level: RecommendLevel;
  userRating?: number;
  problems: Problem[];
};

export const RecommendProblemsTable: React.FC<Props> = (props: Props) => {
  const { userRating, level, problems } = props;
  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination();
  const [lowerDifficulty, upperDifficulty] = recommendDifficultyRange(
    userRating,
    level
  );

  const filteredProblems = problems.filter(
    (problem) =>
      (problem.rating ?? 0) >= lowerDifficulty &&
      (problem.rating ?? 0) <= upperDifficulty
  );
  const problemsLen = useMemo(
    () => filteredProblems.length,
    [filteredProblems]
  );

  return (
    <>
      <TablePagination
        size={problemsLen}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
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
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((problem) => (
                  <ProblemsTableRow problem={problem} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        size={problemsLen}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
};
