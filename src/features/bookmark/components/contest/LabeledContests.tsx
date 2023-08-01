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
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { ContestLabel } from "@features/bookmark/contestLabel";
import { useIndexedDBForContestLabel } from "@features/bookmark/hooks/useIndexedDBForContestLabel";

type Props = { label: ContestLabel };

export const LabeledContests: React.FC<Props> = ({ label }) => {
  const { deleteContestFromLabel } = useIndexedDBForContestLabel();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Contest</TableCell>
            <TableCell>Classification</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {label.contests.length > 0 ? (
            label.contests.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>
                  <ContestLink
                    contestId={c.id as number}
                    contestName={c.name}
                    classification={c.classification}
                  />
                </TableCell>
                <TableCell>{c.classification}</TableCell>
                <TableCell>
                  <ButtonWithAlertDialog
                    title="Delete"
                    dialogText="Are you sure to delete this contest from this label?"
                    dialogTitle="Confirmation"
                    deleteTarget={label.id as number}
                    deleteFn={() =>
                      deleteContestFromLabel(label.id as number, {
                        contestId: c.id as number,
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
                    No contests have been added to this label.
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
