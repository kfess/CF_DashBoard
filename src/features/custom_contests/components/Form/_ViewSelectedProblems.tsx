import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { usePagination } from "@hooks/usePagination";
import { TablePagination } from "@features/ui/component/TablePagination";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { ContestLink } from "@features/contests/components/ContestLink";
import { NoDataMessage } from "@features/ui/component/NoDataBlock";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { HelpToolTip } from "@features/ui/component/HelpToolTip";

type Props = {
  problems: CreateCustomContest["problems"];
};

export const _ViewSelectedProblems: React.FC<Props> = ({ problems }) => {
  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination(problems);

  return (
    <>
      {problems.length > 0 && (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  height: "100%",
                  border: (theme) => `0.5px solid ${theme.palette.divider}`,
                }}
              >
                <TableHead>
                  <TableRow hover>
                    <TableCell>#</TableCell>
                    <TableCell>Problem</TableCell>
                    <TableCell>Contest</TableCell>
                    <TableCell>Difficulty</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {problems
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .sort((a, b) => (a.rating || 0) - (b.rating || 0))
                    .map((p, index) => (
                      <TableRow key={p.name} hover>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <ProblemLink
                            contestId={p.contestId ?? 0}
                            contestName={p.contestName ?? ""}
                            problemId={p.index}
                            problemName={p.name}
                            difficulty={p.rating}
                            showDifficulty={true}
                            showBookmarked={false}
                          />
                        </TableCell>
                        <TableCell>
                          <ContestLink
                            contestId={p.contestId ?? 0}
                            contestName={p.contestName ?? ""}
                            classification={p.classification ?? "Others"}
                            showBookmarked={false}
                          />
                        </TableCell>
                        <TableCell>
                          {p.rating?.toLocaleString() || (
                            <HelpToolTip title="No data available" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <TablePagination
            size={problems.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </>
      )}
      {problems.length === 0 && (
        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{
              border: (theme) => `0.5px solid ${theme.palette.divider}`,
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell colSpan={4}>
                  <NoDataMessage
                    title="You have not added any problems yet."
                    message="Generated problems are listed here."
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
