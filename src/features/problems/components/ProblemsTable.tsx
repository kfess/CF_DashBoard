import React, { useMemo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Problem, Tag } from "@features/problems/problem";
import { usePagination } from "@hooks/usePagination";
import { TablePagination } from "@features/ui/component/TablePagination";
import { ProblemsTableRow } from "@features/problems/components/ProblemsTableRow";
import type { Classification } from "@features/contests/contest";
import { useSolvedStatus } from "@features/submission/hooks/useSolvedStatus";
import type { SolvedStatus } from "@features/problems/components/SolvedStatusFilter";
import { getProblemKey } from "@features/problems/utils";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";

type Props = {
  problems: Problem[];
  selectedTags: Tag[];
  classification: Classification;
  lowerDifficulty: number;
  upperDifficulty: number;
  showTags: boolean;
  solvedStatus: SolvedStatus;
};

export const ProblemsTable: React.FC<Props> = ({
  problems,
  selectedTags,
  classification,
  lowerDifficulty,
  upperDifficulty,
  showTags,
  solvedStatus,
}) => {
  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination(problems);

  const { solvedSet, attemptedSet } = useSolvedStatus();

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const problemKey = getProblemKey(problem);
      const isSolved = solvedSet.has(problemKey);
      const isAttempted = attemptedSet.has(problemKey);

      // Tag filter
      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.every((selectedTag) =>
          (problem.tags as string[]).includes(selectedTag)
        );

      // Classification filter
      const classificationMatch =
        classification === "All" || problem.classification === classification;

      // Difficulty filter
      const difficultyMatch =
        !problem.rating ||
        ((problem.rating ?? -1) >= lowerDifficulty &&
          (problem.rating ?? -1) <= upperDifficulty);

      // Solved status filter
      let solvedStatusMatch = true;
      if (solvedStatus === "Solved") {
        solvedStatusMatch = isSolved;
      } else if (solvedStatus === "Attempting") {
        solvedStatusMatch = isAttempted;
      } else if (solvedStatus === "Not Solved yet") {
        solvedStatusMatch = !isSolved && !isAttempted;
      }

      return (
        tagMatch && classificationMatch && difficultyMatch && solvedStatusMatch
      );
    });
  }, [
    problems,
    selectedTags,
    classification,
    lowerDifficulty,
    upperDifficulty,
    solvedStatus,
    solvedSet,
    attemptedSet,
  ]);

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
      <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
        <TableContainer component={Paper}>
          <Table
            sx={{
              height: "100%",
              border: (theme) => `0.5px solid ${theme.palette.divider}`,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Problem
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Contest
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Difficulty
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Solved
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Solution
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {problemsLen > 0 ? (
              <TableBody>
                {filteredProblems
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((problem) => {
                    const key = getProblemKey(problem);
                    const isSolved = solvedSet.has(key);
                    const isAttempted = attemptedSet.has(key);
                    return (
                      <ProblemsTableRow
                        key={key}
                        problem={problem}
                        showTags={showTags}
                        isSolved={isSolved}
                        isAttempted={isAttempted}
                      />
                    );
                  })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6}>
                    <NoDataMessage
                      title="No Problems Found"
                      message="Please check your filter options."
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
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
