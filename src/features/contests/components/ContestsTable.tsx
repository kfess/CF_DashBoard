import React, { useMemo, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import type { ReshapedContest } from "@features/contests/contest";
import { ContestTableRow } from "@features/contests/components/ContestTableRow";

type Props = {
  contests: ReshapedContest[];
  problemIdxes: string[];
  showDifficulty: boolean;
  solvedSet?: Set<string>;
  attemptedSet?: Set<string>;
};

export const ContestsTable: React.FC<Props> = (props: Props) => {
  const { contests, problemIdxes, showDifficulty, solvedSet, attemptedSet } =
    props;

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const contestsLen = useMemo(() => contests.length, [contests]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TablePagination
        component="div"
        count={contestsLen}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Contest</TableCell>
                {problemIdxes.map((idx) => (
                  <TableCell align="center">{idx}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...contests]
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((contest) => (
                  <ContestTableRow
                    contestId={contest.contestId}
                    contestName={contest.contestName}
                    problems={contest.problems}
                    showDifficulty={showDifficulty}
                    solvedSet={solvedSet}
                    attemptedSet={attemptedSet}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        component="div"
        count={contestsLen}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
