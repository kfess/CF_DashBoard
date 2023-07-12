import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Submission } from "@features/submission/submission";
import { getACTagMap } from "@features/achievement/processSubmission";
import { tags } from "@features/problems/problem";
import { Chip_ } from "@features/ui/component/Chip";
import { useToggle } from "@hooks/index";

type Props = { submissions: Submission[] };

export const TagACCount: React.FC<Props> = (props: Props) => {
  const [isReadMore, toggleReadMore] = useToggle(true, false);

  const { submissions } = props;
  const tagMap = getACTagMap(submissions);
  const tagCounts = [...tags]
    .sort((a, b) => (tagMap.get(b) ?? 0) - (tagMap.get(a) ?? 0))
    .filter((tag) => (tagMap.get(tag) ?? 0) > 0);
  const readTagCounts = isReadMore ? tagCounts.slice(0, 5) : tagCounts;

  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <Typography variant="h6" gutterBottom>
          Problem Tags
        </Typography>
      </Box>
      <Stack spacing={1}>
        {readTagCounts.map((tag) => (
          <Stack key={tag} direction="row" spacing={1} alignItems="center">
            <Chip_ label={tag} />
            <Typography variant="body2" color="text.secondary">
              × {tagMap.get(tag)?.toLocaleString()}
            </Typography>
          </Stack>
        ))}
      </Stack>
      {tagCounts.length > 5 ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 1 }}>
          <span
            onClick={toggleReadMore}
            css={{
              cursor: "pointer",
              color: "text.secondary",
              fontSize: "body2.fontSize",
            }}
          >
            {isReadMore ? "Show More" : "Show Less"}
          </span>
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary" align="center">
          No problems solved
        </Typography>
      )}
    </Box>
  );
};
