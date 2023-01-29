import React, { useMemo, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import type { ReshapedContest } from "@features/contests/contest";
import { ContestTableRow } from "@features/contests/components/ContestTableRow";

type Props = {
  contests: ReshapedContest[];
  problemIdxes: string[];
};

export const ContestsTable: React.FC<Props> = (props: Props) => {
  const { contests, problemIdxes } = props;

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
      <TableContainer component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Contest</TableCell>
            {problemIdxes.map((idx) => (
              <TableCell>{idx}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {[...contests]
          .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
          .map((contest) => (
            <ContestTableRow
              contestId={contest.id}
              contestName={contest.name}
              problems={contest.problems}
            />
          ))}
      </TableContainer>
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
