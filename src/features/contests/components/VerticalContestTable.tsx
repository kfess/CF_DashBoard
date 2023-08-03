import React, { useMemo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@features/ui/component/TablePagination";
import { usePagination } from "@hooks/usePagination";
import type { Contest } from "@features/contests/contest";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";

type Props = {
  contests: Contest[];
  showDifficulty: boolean;
};

export const VerticalContestTable: React.FC<Props> = ({
  contests,
  showDifficulty,
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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {slicedContests.map((c) => (
              <React.Fragment key={c.id}>
                <TableRow>
                  <TableCell component="th" scope="row" colSpan={2}>
                    <ContestLink
                      contestId={c.id}
                      contestName={c.name}
                      classification={c.classification}
                    />
                  </TableCell>
                </TableRow>
                {c.problems
                  .sort((a, b) => a.index.localeCompare(b.index))
                  .map((p) => (
                    <TableRow key={p.index}>
                      <TableCell>{p.index}</TableCell>
                      <TableCell>
                        <ProblemLink
                          key={p.index}
                          showDifficulty={showDifficulty}
                          contestId={c.id}
                          contestName={c.name}
                          problemId={p.index}
                          problemName={p.name}
                          difficulty={p.rating}
                          solvedCount={p.solvedCount}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
