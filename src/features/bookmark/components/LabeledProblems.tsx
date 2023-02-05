import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ContestLink } from "@features/contests/components/ContestLink";
import { ProblemLink } from "@features/problems/components/ProblemLink";
import { labelsState } from "@features/bookmark/label.atom";
import { LabelNameChip } from "@features/bookmark/components/LabelIcon";
import { ButtonWithAlertDialog } from "@features/ui/component/AlertDialog";

type Props = { labelName?: string };

export const LabeledProblems: React.FC<Props> = (props: Props) => {
  const { labelName } = props;

  const [labels, setLabels] = useRecoilState(labelsState);
  const label = labels.find((l) => l.name === labelName);

  const navigate = useNavigate();
  if (!label) {
    navigate("/contest");
  }

  const deleteProblem = (
    contestId: number,
    problemIndex: string,
    problemName: string
  ) => {
    setLabels((oldLabels) => [
      ...oldLabels.map((label) => {
        if (label.name === labelName) {
          return {
            ...label,
            problems: label.problems.filter(
              (p) =>
                p.contestId !== contestId ||
                p.index !== problemIndex ||
                p.name !== problemName
            ),
          };
        } else {
          return label;
        }
      }),
    ]);
  };

  return (
    <>
      {label && (
        <>
          <LabelNameChip name={label.name} color={label.color} mode="Preview" />
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
              <>
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
                        deleteProblem(p.contestId as number, p.index, p.name)
                      }
                    />
                  </Box>
                </Box>
                <Divider />
              </>
            ))}
          </Box>
        </>
      )}
    </>
  );
};
