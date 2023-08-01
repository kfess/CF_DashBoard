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
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { AlertMessage } from "@features/ui/component/AlertDialog";
import { ProblemLabel } from "@features/bookmark/problemLabel";
import { useIndexedDBForProblemLabel } from "@features/bookmark/hooks/useIndexedDBForProblemLabel";
import { getProblemKey } from "@features/problems/utils";

type Props = { label: ProblemLabel };

export const LabeledProblems: React.FC<Props> = ({ label }) => {
  const { deleteProblemFromLabel } = useIndexedDBForProblemLabel();

  console.log(label.problems);
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
                <TableRow
                  key={getProblemKey(p.contestId, p.index, p.contestName)}
                  hover
                >
                  <TableCell>
                    <ContestLink
                      contestId={p.contestId as number}
                      contestName={p.contestName}
                      // classification={p.}
                    />
                  </TableCell>
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
