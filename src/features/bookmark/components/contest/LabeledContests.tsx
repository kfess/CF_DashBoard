import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { AlertMessage } from "@features/ui/component/AlertDialog";
import { ContestLabel } from "@features/bookmark/contestLabel";
import { useIndexedDBForContestLabel } from "@features/bookmark/hooks/useIndexedDBForContestLabel";

type Props = { label: ContestLabel };

export const LabeledContests: React.FC<Props> = ({ label }) => {
  const { deleteContestFromLabel } = useIndexedDBForContestLabel();

  return (
    <>
      {label.contests.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contest</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {label.contests.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>
                    <ContestLink
                      contestId={c.id as number}
                      contestName={c.name}
                    />
                  </TableCell>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <AlertMessage title="warning" message="There is no problems." />
      )}
    </>
  );
};
