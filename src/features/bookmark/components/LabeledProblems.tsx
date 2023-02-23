import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { LabelState } from "@features/bookmark/label.atom";
import { LabelNameChip } from "@features/bookmark/components/LabelIcon";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";
import { labelActions } from "@features/bookmark/labelActions";
import { AlertMessage } from "@features/ui/component/AlertDialog";

type Props = { label: LabelState };

export const LabeledProblems: React.FC<Props> = (props: Props) => {
  const { label } = props;
  const deleteProblem = labelActions.useDeleteProblem();

  return (
    <>
      <LabelNameChip name={label.name} color={label.color} mode="Preview" />
      {label.problems.length > 0 ? (
        <Box
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ p: 1, display: "flex" }}>
            <Box sx={{ width: "30%", textAlign: "left" }}>Contest</Box>
            <Box sx={{ width: "40%", textAlign: "left" }}>Problem</Box>
          </Box>
          <Divider />
          {label.problems.map((p) => (
            <Box>
              <Box sx={{ p: 1, display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "30%", textAlign: "left" }}>
                  <ContestLink
                    contestId={p.contestId as number}
                    contestName={p.contestName}
                  />
                </Box>
                <Box sx={{ width: "40%", textAlign: "left" }}>
                  <ProblemLink
                    contestId={p.contestId as number}
                    contestName={p.contestName}
                    problemId={p.index}
                    problemName={p.name}
                    showDifficulty={false}
                  />
                </Box>
                <Box sx={{ width: "30%", textAlign: "left" }}>
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
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </Box>
      ) : (
        <AlertMessage title="warning" message="There is no problems." />
      )}
    </>
  );
};
