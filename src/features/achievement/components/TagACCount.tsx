import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import IconButton from "@mui/material/IconButton";
import { Submission } from "@features/submission/submission";
import { getACTagMap } from "@features/achievement/processSubmission";
import { tags } from "@features/problems/problem";
import { Chip_ } from "@features/ui/component/Chip";
import { useToggle } from "@hooks/index";

type Props = { readonly submissions: Submission[] };

export const TagACCount: React.FC<Props> = ({ submissions }) => {
  const [isReadMore, toggleReadMore] = useToggle(true, false);

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
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>
          Problem Tags
        </Typography>
        <IconButton>
          <OpenInNewIcon fontSize="small" />
        </IconButton>
      </Stack>
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
              color: "#5C17C5",
              fontWeight: "bold",
              fontSize: "body2.fontSize",
            }}
          >
            {isReadMore ? (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <div>Show More</div>
                <KeyboardDoubleArrowDownIcon />
              </Stack>
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <div>Show Less</div>
                <KeyboardDoubleArrowUpIcon />
              </Stack>
            )}
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
