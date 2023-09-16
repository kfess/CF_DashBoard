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
import { HelpToolTip } from "@features/ui/component/HelpToolTip";

type Props = {
  isEdit?: boolean;
  field: ControllerRenderProps<CreateCustomContest, "problems">;
};

export const SelectedProblemsTable: React.FC<Props> = ({
  isEdit = true,
  field,
}) => {
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
                    {isEdit && <TableCell>Delete</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProblems
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
                        {isEdit && (
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
                        )}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
      {selectedProblems.length === 0 && (
        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{
              border: (theme) => `0.5px solid ${theme.palette.divider}`,
            }}
          >
            <TableRow>
              <TableCell colSpan={5}>
                <NoDataMessage
                  title="You have not added any problems yet."
                  message="Generated problems are listed here."
                  height="300px"
                />
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
