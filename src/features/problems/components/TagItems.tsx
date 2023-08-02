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
  selectedTags: Tag[];
  setSelectedTags: (arg: Tag[]) => void;
};

type TagItem = {
  tag: Tag;
  count: number;
};

export const TagItems: React.FC<Props> = ({
  problems,
  selectedTags,
  setSelectedTags,
}) => {
  const [expanded, setExpanded] = useState(false);

  const tagItems: TagItem[] = tags.map((tag) => ({
    tag,
    count: problems.filter((problem) => (problem.tags as Tag[]).includes(tag))
      .length,
  }));

  const addOrRemoveTag = (tag: Tag) => {
    selectedTags.includes(tag)
      ? setSelectedTags([
          ...selectedTags.filter((selectedTag) => selectedTag !== tag),
        ])
      : setSelectedTags([...selectedTags, tag]);
  };

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
              margin: "0.3rem",
            },
            whiteSpace: "nowrap",
          }}
        >
          {tagItems.map((tagItem) => (
            <Box
              key={tagItem.tag}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                color: selectedTags.includes(tagItem.tag)
                  ? "#9246FF"
                  : "inherit",
                "&:hover": {
                  color: "#9246FF",
                },
              }}
            >
              <span
                onClick={() => {
                  addOrRemoveTag(tagItem.tag);
                }}
              >
                {tagItem.tag} <Chip_ label={tagItem.count} />
              </span>
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
              color: "#9246FF",
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
