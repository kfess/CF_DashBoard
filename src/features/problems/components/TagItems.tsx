import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { Problem } from "@features/problems/problem";
import { tags } from "@features/problems/problem";
import type { Tag } from "@features/problems/problem";
import { Chip } from "@features/ui/component/Chip";
import { ReadMoreLess } from "@features/ui/component/ReadMoreLess";
import { useURLQuery } from "@hooks/useQueryParams";

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
  const { setURLQuery } = useURLQuery();

  const [expanded, setExpanded] = useState(false);

  const tagItems: TagItem[] = tags.map((tag) => ({
    tag,
    count: problems.filter((problem) => (problem.tags as Tag[]).includes(tag))
      .length,
  }));

  const addOrRemoveTag = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      const newTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
      setSelectedTags(newTags);
      setURLQuery({ tags: newTags.length ? newTags : undefined });
    } else {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      setURLQuery({ tags: newTags });
    }
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
            <Stack
              key={tagItem.tag}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                cursor: "pointer",
                color: selectedTags.includes(tagItem.tag)
                  ? (theme) => theme.palette.primary.main
                  : "inherit",
                "&:hover": {
                  color: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <span
                onClick={() => {
                  addOrRemoveTag(tagItem.tag);
                }}
              >
                {tagItem.tag} <Chip label={tagItem.count} />
              </span>
            </Stack>
          ))}
        </Stack>
      </Box>
      {tagItems.length > 1 && (
        <Stack direction="row" justifyContent="right">
          <ReadMoreLess
            expanded={expanded}
            toggleExpanded={() => setExpanded(!expanded)}
            threshold={1}
            itemsCount={tagItems.length}
          />
        </Stack>
      )}
    </div>
  );
};
