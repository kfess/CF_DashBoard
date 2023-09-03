import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { ControllerRenderProps } from "react-hook-form";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { IconButton } from "@features/ui/component/IconButton";

type Props = {
  field: ControllerRenderProps<CreateCustomContest, "problems">;
};

export const SelectedProblemsTable: React.FC<Props> = ({ field }) => {
  const selectedProblems = field.value;
  const removeProblem = (index: number) => {
    field.onChange(selectedProblems.filter((_, idx) => index !== idx));
  };

  const [page, setPage, rowsPerPage, setRowsPerPage] =
    usePagination(selectedProblems);

  return (
    <>
      {selectedProblems.length > 0 && (
        <>
          <TablePagination
            size={selectedProblems.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow hover>
                    <TableCell>Problem</TableCell>
                    <TableCell>Contest</TableCell>
                    <TableCell>Difficulty</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProblems
                    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                    .sort((a, b) => (a.rating || 0) - (b.rating || 0))
                    .map((p, index) => (
                      <TableRow key={p.name} hover>
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
                        <TableCell>{p.rating || "no data"}</TableCell>
                        <TableCell>
                          <IconButton
                            icon={<DeleteIcon />}
                            onClick={() => {
                              removeProblem(index);
                            }}
                            size="small"
                            aria-label="delete problems"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
      {selectedProblems.length === 0 && (
        <TableContainer component={Paper}>
          <Table>
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
