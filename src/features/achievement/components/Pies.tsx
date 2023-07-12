import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { DifficultyPies } from "@features/achievement/components/DifficultyPies";
import { ClassificationPies } from "@features/achievement/components/ClassificationPies";
import { Submission } from "@features/submission/submission";

const pieKinds = ["Difficulty", "Contest Type"] as const;
type PieKinds = typeof pieKinds[number];

type Props = { submissions: Submission[] };

export const Pies: React.FC<Props> = ({ submissions }) => {
  const [pieKind, setPieKind] = useState<PieKinds>("Difficulty");

  return (
    <Box>
      <Box
        sx={{
          m: 1,
          p: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Solved Pie Chart
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <ToggleButtonGroup
          value={pieKind}
          exclusive
          onChange={(_, value) => value && setPieKind(value)}
          size="small"
          sx={{
            "& .MuiToggleButtonGroup-grouped": {
              borderColor: "grey.500",
            },
          }}
        >
          <ToggleButton value="Difficulty" disableRipple>
            Difficulty
          </ToggleButton>
          <ToggleButton value="Contest Type" disableRipple>
            Contest Type
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {pieKind === "Difficulty" && <DifficultyPies submissions={submissions} />}
      {pieKind === "Contest Type" && (
        <ClassificationPies submissions={submissions} />
      )}
    </Box>
  );
};
