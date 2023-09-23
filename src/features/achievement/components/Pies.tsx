import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { DifficultyPies } from "@features/achievement/components/DifficultyPies";
import { ClassificationPies } from "@features/achievement/components/ClassificationPies";
import { Submission } from "@features/submission/submission";

const pieKinds = ["Difficulty", "Contest Type"] as const;
type PieKinds = (typeof pieKinds)[number];

type Props = { submissions: Submission[] };

export const Pies: React.FC<Props> = ({ submissions }) => {
  const [pieKind, setPieKind] = useState<PieKinds>("Difficulty");

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Solved Pie Chart
      </Typography>
      <Stack direction="row" justifyContent="center" my={2}>
        <ToggleButtonGroup
          value={pieKind}
          exclusive
          onChange={(_, value) => value && setPieKind(value)}
          sx={{
            "& .MuiToggleButtonGroup-grouped": {
              border: 1,
              borderColor: "divider",
            },
          }}
        >
          <ToggleButton
            value="Difficulty"
            disableRipple
            sx={{ textTransform: "none" }}
          >
            Difficulty
          </ToggleButton>
          <ToggleButton
            value="Contest Type"
            disableRipple
            sx={{ textTransform: "none" }}
          >
            Contest Type
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {pieKind === "Difficulty" && <DifficultyPies submissions={submissions} />}
      {pieKind === "Contest Type" && <ClassificationPies />}
    </Box>
  );
};
