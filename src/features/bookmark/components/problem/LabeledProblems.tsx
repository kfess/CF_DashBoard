import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { ProblemLabel } from "@features/bookmark/problemLabel";
import { useIndexedDBForProblemLabel } from "@features/bookmark/hooks/useIndexedDBForProblemLabel";
import { getProblemKey } from "@features/problems/utils";

type Props = { label: ProblemLabel };

export const LabeledProblems: React.FC<Props> = ({ label }) => {
  const { deleteProblemFromLabel } = useIndexedDBForProblemLabel();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Problem</TableCell>
            <TableCell>Contest</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {label.problems.length > 0 ? (
            label.problems.map((p) => (
              <TableRow
                key={getProblemKey(p.contestId, p.index, p.contestName)}
                hover
              >
                <TableCell>
                  <ProblemLink
                    showDifficulty={true}
                    contestId={p.contestId as number}
                    contestName={p.contestName}
                    problemId={p.index}
                    problemName={p.name}
                    difficulty={p.rating as number}
                  />
                </TableCell>
                <TableCell>
                  <ContestLink
                    contestId={p.contestId as number}
                    contestName={p.contestName}
                  />
                </TableCell>
                <TableCell>{p.rating}</TableCell>
                <TableCell>
                  <ButtonWithAlertDialog
                    title="Delete"
                    dialogText="Are you sure to delete this problem from this label?"
                    dialogTitle="Confirmation"
                    deleteTarget={label.id as number}
                    deleteFn={() =>
                      deleteProblemFromLabel(label.id as number, {
                        contestId: p.contestId as number,
                        index: p.index,
                      })
                    }
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 100,
                    color: "grey.600",
                  }}
                >
                  <Typography variant="body1" align="center">
                    No problems have been added to this label.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
