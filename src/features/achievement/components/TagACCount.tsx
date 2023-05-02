import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Submission } from "@features/submission/submission";
import { getACTagMap } from "@features/achievement/processSubmission";
import { tags } from "@features/problems/problem";
import { Chip_ } from "@features/ui/component/Chip";
import { useToggle } from "@hooks/index";

type Props = { submissions: Submission[] };

export const TagACCount: React.FC<Props> = (props: Props) => {
  const [isReadMore, toggleReadMore] = useToggle(true, true);

  const { submissions } = props;
  const tagMap = getACTagMap(submissions);
  const tagCounts = [...tags]
    .sort((a, b) => (tagMap.get(b) ?? 0) - (tagMap.get(a) ?? 0))
    .filter((tag) => (tagMap.get(tag) ?? 0) > 0);
  const readTagCounts = isReadMore ? tagCounts.slice(0, 5) : tagCounts;

  return (
    <Box>
      <Box sx={{ marginTop: 1, marginBottom: 1 }}>
        <strong>Problem Tags</strong>
      </Box>
      {readTagCounts.map((tag) => (
        <Stack key={tag}>
          <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
            <Chip_ label={tag} />
            <span css={{ fontSize: "12px", color: "gray" }}>
              × {tagMap.get(tag)?.toLocaleString()}
            </span>
          </Stack>
        </Stack>
      ))}
      {tagCounts.length > 5 ? (
        <div css={{ fontSize: "12px", color: "gray", textAlign: "center" }}>
          <span onClick={toggleReadMore} css={{ cursor: "pointer" }}>
            {isReadMore ? "Show More" : "Show Less"}
          </span>
        </div>
      ) : (
        <div css={{ fontSize: "14px", color: "gray" }}>No problems solved</div>
      )}
    </Box>
  );
};
