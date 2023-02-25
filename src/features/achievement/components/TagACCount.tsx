import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Submission } from "@features/submission/submission";
import { getACTagMap } from "@features/achievement/processSubmission";
import { tags } from "@features/problems/problem";
import { Chip_ } from "@features/ui/component/Chip";

type Props = { submissions: Submission[] };

export const TagACCount: React.FC<Props> = (props: Props) => {
  const { submissions } = props;

  const tagMap = getACTagMap(submissions);

  return (
    <Box>
      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <strong>Problem Tags</strong>
      </Box>
      {[...tags]
        .sort((a, b) => (tagMap.get(b) ?? 0) - (tagMap.get(a) ?? 0))
        .filter((tag) => (tagMap.get(tag) ?? 0) > 0)
        .map((tag) => (
          <Stack>
            <Stack
              direction="row"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Chip_ label={tag} />× {tagMap.get(tag)}
            </Stack>
          </Stack>
        ))}
    </Box>
  );
};
