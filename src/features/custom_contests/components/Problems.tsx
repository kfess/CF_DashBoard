import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Problem } from "@features/problems/problem";
import { ProblemLink } from "@features/problems/components/ProblemLink";

type Props = { problems: Problem[] };

export const Problems: React.FC<Props> = ({ problems }) => {
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{
              height: "100%",
              border: (theme) => `0.5px solid ${theme.palette.divider}`,
            }}
          >
            <TableHead>
              <TableRow hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    #
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Problem
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="fontWeightBold">
                    Difficulty
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {problems.map((problem, idx) => (
                <TableRow key={problem.contestId + problem.index}>
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
