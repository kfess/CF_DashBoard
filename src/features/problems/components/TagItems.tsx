import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import type { Problem } from "@features/problems/problem";
import { tags } from "@features/problems/problem";
import type { Tag } from "@features/problems/problem";
import { Chip_ } from "@features/ui/component/Chip";

type Props = {
  problems: Problem[];
};

type TagItem = {
  tag: Tag;
  count: number;
};

export const TagItems: React.FC<Props> = ({ problems }) => {
  const [expanded, setExpanded] = useState(false);

  const tagItems: TagItem[] = tags.map((tag) => ({
    tag,
    count: problems.filter((problem) => (problem.tags as Tag[]).includes(tag))
      .length,
  }));

  return (
    <div>
      <Box
        sx={{
          position: "relative",
          overflowX: expanded ? "visible" : "scroll",
        }}
      >
        <Stack
          direction="row"
          sx={{
            flexWrap: expanded ? "wrap" : "nowrap",
            justifyContent: "flex-start",
            marginTop: "0.5rem",
            "& > *": {
              margin: "0.20rem",
            },
            whiteSpace: "nowrap",
          }}
        >
          {tagItems.map((tagItem) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                "&:hover": {
                  color: "#1890ff",
                },
              }}
            >
              <span>{tagItem.tag}</span>
              <Chip_ label={tagItem.count} />
            </Box>
          ))}
        </Stack>
      </Box>
      {tagItems.length > 1 && (
        <Box
          onClick={() => setExpanded(!expanded)}
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            "&:hover": {
              color: "#1890ff",
            },
          }}
        >
          {expanded ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span>Collapse</span>
              <KeyboardDoubleArrowUpIcon />
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <span>Expand</span>
              <KeyboardDoubleArrowDownIcon />
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};
