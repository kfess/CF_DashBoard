import React, { Dispatch, SetStateAction } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { usePagination } from "@hooks/index";
import { TablePagination } from "@features/ui/component/TablePagination";
import { Problem } from "@features/problems/problem";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { ContestLink } from "@features/contests/components/ContestLink";

type Props = {
  selectedProblems: Problem[];
  setSelectedProblems: Dispatch<SetStateAction<Problem[]>>;
};

export const SelectedProblemsTable: React.FC<Props> = (props: Props) => {
  const { selectedProblems, setSelectedProblems } = props;

  const [page, setPage, rowsPerPage, setRowsPerPage] = usePagination();

  const removeProblem = (index: number) => {
    setSelectedProblems(selectedProblems.filter((_, idx) => index !== idx));
  };

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
                          />
                        </TableCell>
                        <TableCell>
                          <ContestLink
                            contestId={p.contestId ?? 0}
                            contestName={p.contestName ?? ""}
                          />
                        </TableCell>
                        <TableCell>{p.rating}</TableCell>
                        <TableCell>
                          <IconButton size="small" sx={{ borderRadius: "20%" }}>
                            <DeleteIcon
                              onClick={() => {
                                removeProblem(index);
                              }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  {selectedProblems.length === 0 && (
                    <TableRow hover>No Problems are selected.</TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
      {selectedProblems.length === 0 && (
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderStyle: "solid",
            borderRadius: "5px",
            borderColor: "gray",
            borderWidth: "1px",
            height: "100px",
            fontSize: "20px",
            color: "gray",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <div>There are no selected problems.</div>
          <div css={{ fontSize: "16px" }}>
            Generated problems are listed here.
          </div>
        </div>
      )}
    </>
  );
};
