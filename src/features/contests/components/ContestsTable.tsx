import React, { useMemo } from "react";
import { Typography } from "@mui/material";
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
import { useURLQuery } from "@hooks/useQueryParams";
import type { SolvedStatus } from "@features/contests/components/SolvedStatusFilter";

type Props = {
  contests: ReshapedContest[];
  problemIdxes: string[];
  showDifficulty: boolean;
  solvedStatus: SolvedStatus;
  solvedSet?: Set<string>;
  attemptedSet?: Set<string>;
};

export const ContestsTable: React.FC<Props> = ({
  contests,
  problemIdxes,
  showDifficulty,
  solvedStatus,
  solvedSet,
  attemptedSet,
}) => {
  const { queryParams } = useURLQuery();
  const userId = queryParams["userId"];

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
                    userId={userId}
                    contestId={contest.id}
                    contestName={contest.name}
                    classification={contest.classification}
                    problemIdxes={problemIdxes}
                    problems={contest.problems}
                    showDifficulty={showDifficulty}
                    solvedStatus={solvedStatus}
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
