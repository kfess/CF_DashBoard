import React, { useMemo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Problem, Tag } from "@features/problems/problem";
import { usePagination } from "@hooks/index";
import { TablePagination } from "@features/ui/component/TablePagination";
import { ProblemsTableRow } from "@features/problems/components/ProblemsTableRow";
import type { Classification } from "@features/contests/contest";
import { useSolvedStatus } from "@features/submission/useSolvedStatus";
import { QueryParamKeys, useQueryParams } from "@hooks/useQueryParams";
import { useThemeContext } from "@features/color/themeColor.hook";

type Props = {
  problems: Problem[];
  selectedTags: Tag[];
  classification: Classification;
  lowerDifficulty: number;
  upperDifficulty: number;
  showTags: boolean;
};

export const ProblemsTable: React.FC<Props> = (props: Props) => {
  const {
    problems,
    selectedTags,
    classification,
    lowerDifficulty,
    upperDifficulty,
    showTags,
  } = props;

  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination();
  const filteredProblems = [...problems]
    .filter((problem) =>
      selectedTags.length === 0
        ? true
        : selectedTags.every((selectedTag) => {
            return (problem.tags as string[]).includes(selectedTag);
          })
    )
    .filter((problem) =>
      classification === "All"
        ? true
        : problem.classification === classification
    )
    .filter((problem) => (problem.rating ?? -1) >= lowerDifficulty)
    .filter((problem) => (problem.rating ?? -1) <= upperDifficulty);

  const problemsLen = useMemo(
    () => filteredProblems.length,
    [filteredProblems]
  );

  const { theme } = useThemeContext();
  const { solvedSet, attemptedSet } = useSolvedStatus();

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
          <Table stickyHeader css={{ height: "100%" }}>
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
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((problem) => {
                  const problemKey = `${problem.contestId}-${problem.index}`;
                  const isSolved = solvedSet?.has(problemKey);
                  const isAttempted = attemptedSet?.has(problemKey);
                  const backgroundColor = isSolved
                    ? theme.colors.acColor
                    : isAttempted
                    ? theme.colors.waColor
                    : "";
                  return (
                    <ProblemsTableRow
                      problem={problem}
                      showTags={showTags}
                      backgroundColor={backgroundColor}
                    />
                  );
                })}
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
