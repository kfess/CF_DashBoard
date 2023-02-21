import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { Submission } from "@features/submission/submission";
import { getACTagMap } from "@features/achievement/processSubmission";
import { tags } from "@features/problems/problem";

type Props = { submissions: Submission[] };

export const TagACCount: React.FC<Props> = (props: Props) => {
  const { submissions } = props;

  const tagMap = getACTagMap(submissions);

  return (
    <Box>
      <div>Problem Tags</div>
      {[...tags]
        .sort((a, b) => (tagMap.get(b) ?? 0) - (tagMap.get(a) ?? 0))
        .map((tag) => (
          <Stack>
            <Stack direction="row" spacing={5}>
              <Chip
                sx={{ m: 0.5 }}
                label={tag}
                size="small"
                onClick={() => {}}
              />
              <div>{tagMap.get(tag)} problems solved</div>
            </Stack>
          </Stack>
        ))}
    </Box>
  );
};
