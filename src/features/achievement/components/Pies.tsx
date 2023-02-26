import React, { useState } from "react";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { DifficultyPies } from "@features/achievement/components/DifficultyPies";
import { ClassificationPies } from "@features/achievement/components/ClassificationPies";
import { Submission } from "@features/submission/submission";

const pieKinds = ["Difficulty", "Contest Type"] as const;
type PieKinds = typeof pieKinds[number];

type Props = { submissions: Submission[] };

export const Pies: React.FC<Props> = (props: Props) => {
  const { submissions } = props;
  const [pieKind, setPieKind] = useState<PieKinds>("Difficulty");

  return (
    <>
      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <strong>Solved Pie Chart</strong>
      </Box>
      <Box sx={{ display: "flex", p: 1 }}>
        <ButtonGroup>
          <Button
            onClick={() => {
              setPieKind("Difficulty");
            }}
            variant="contained"
            color="inherit"
            size="small"
            sx={{ textTransform: "none" }}
          >
            Difficulty
          </Button>
          <Button
            onClick={() => {
              setPieKind("Contest Type");
            }}
            variant="contained"
            color="inherit"
            size="small"
            sx={{ textTransform: "none" }}
          >
            Contest Type
          </Button>
        </ButtonGroup>
      </Box>
      {pieKind === "Difficulty" && <DifficultyPies submissions={submissions} />}
      {pieKind === "Contest Type" && (
        <ClassificationPies submissions={submissions} />
      )}
    </>
  );
};
