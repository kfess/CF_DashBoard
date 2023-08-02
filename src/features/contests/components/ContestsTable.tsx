import React, { useMemo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { ReshapedContest } from "@features/contests/contest";
import { ContestTableRow } from "@features/contests/components/ContestTableRow";
import { TablePagination } from "@features/ui/component/TablePagination";
import { usePagination } from "@hooks/usePagination";
import { Typography } from "@mui/material";

type Props = {
  contests: ReshapedContest[];
  problemIdxes: string[];
  showDifficulty: boolean;
  solvedSet?: Set<string>;
  attemptedSet?: Set<string>;
};

export const ContestsTable: React.FC<Props> = ({
  contests,
  problemIdxes,
  showDifficulty,
  solvedSet,
  attemptedSet,
}) => {
  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination(contests);
  const slicedContests = useMemo(
    () => contests.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [contests, page]
  );
  const contestsLen = useMemo(() => contests.length, [contests]);

  return (
    <>
      <TablePagination
        size={contestsLen}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ height: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    borderRight: "1px solid rgba(224, 224, 224, 1)",
                    borderBottom: "2px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  <Typography variant="body1" fontWeight="fontWeightBold">
                    Contest
                  </Typography>
                </TableCell>
                {problemIdxes.map((idx) => (
                  <TableCell
                    align="center"
                    key={idx}
                    sx={{
                      borderRight: "1px solid rgba(224, 224, 224, 1)",
                      borderBottom: "2px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    <Typography variant="body1" fontWeight="fontWeightBold">
                      {idx}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedContests.map((contest) => {
                return (
                  <ContestTableRow
                    key={contest.id}
                    contestId={contest.id}
                    contestName={contest.name}
                    classification={contest.classification}
                    problemIdxes={problemIdxes}
                    problems={contest.problems}
                    showDifficulty={showDifficulty}
                    solvedSet={solvedSet}
                    attemptedSet={attemptedSet}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        size={contestsLen}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </>
  );
};
