import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Problem } from "@features/problems/problem";
import { ProblemLink } from "@features/problems/components/ProblemLink";

type Props = { problems: Problem[] };

export const Problems: React.FC<Props> = (props: Props) => {
  const { problems } = props;

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow hover>
                <TableCell>#</TableCell>
                <TableCell>Problem</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {problems.map((problem, idx) => (
                <TableRow>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <ProblemLink
                      showDifficulty={true}
                      contestId={problem.contestId ?? 0}
                      contestName={problem.contestName ?? ""}
                      problemId={problem.index}
                      problemName={problem.name}
                      difficulty={problem.rating}
                      solvedCount={0}
                    />
                  </TableCell>
                  <TableCell>{problem.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
