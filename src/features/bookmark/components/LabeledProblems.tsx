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
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { LabelState } from "@features/bookmark/label.atom";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { labelActions } from "@features/bookmark/labelActions";
import { AlertMessage } from "@features/ui/component/AlertDialog";

type Props = { label: LabelState };

export const LabeledProblems: React.FC<Props> = (props: Props) => {
  const { label } = props;
  const deleteProblem = labelActions.useDeleteProblem();

  return (
    <>
      {label.problems.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contest</TableCell>
                <TableCell>Problem</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {label.problems.map((p) => (
                <TableRow key={p.index}>
                  <TableCell>
                    <ContestLink
                      contestId={p.contestId as number}
                      contestName={p.contestName}
                    />
                  </TableCell>
                  <TableCell>
                    <ProblemLink
                      contestId={p.contestId as number}
                      contestName={p.contestName}
                      problemId={p.index}
                      problemName={p.name}
                      showDifficulty={true}
                    />
                  </TableCell>
                  <TableCell>
                    <ButtonWithAlertDialog
                      title="Delete"
                      dialogText="Are you sure to delete this problem from this label?"
                      dialogTitle="Confirmation"
                      deleteTarget={label.id}
                      deleteFn={() =>
                        deleteProblem(
                          label.name,
                          p.contestId as number,
                          p.index,
                          p.name
                        )
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
