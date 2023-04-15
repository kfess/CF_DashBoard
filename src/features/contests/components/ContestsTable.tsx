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
import { usePagination } from "@hooks/index";

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

  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination();
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
          <Table stickyHeader css={{ height: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Contest</TableCell>
                {problemIdxes.map((idx) => (
                  <TableCell align="center" key={idx}>
                    {idx}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...contests]
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((contest) => {
                  return (
                    <ContestTableRow
                      key={contest.id}
                      contestId={contest.id}
                      contestName={contest.name}
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
