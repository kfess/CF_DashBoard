import React from "react";
import Stack from "@mui/material/Stack";
import { TagsButton } from "@features/problems/components/TagsButton";
import { DeletableChip } from "@features/ui/component/Chip";
import { Tag } from "@features/problems/problem";

type Props = {
  includeTags: Tag[];
  removeIncludeTag: (tag: Tag) => void;
  removeAllIncludeTags: () => void;
  addOrRemoveIncludeTag: (tag: Tag) => void;
  excludeTags: Tag[];
  removeExcludeTag: (tag: Tag) => void;
  removeAllExcludeTags: () => void;
  addOrRemoveExcludeTag: (tag: Tag) => void;
};

export const ProblemsTag: React.FC<Props> = ({
  includeTags,
  removeIncludeTag,
  removeAllIncludeTags,
  addOrRemoveIncludeTag,
  excludeTags,
  removeExcludeTag,
  removeAllExcludeTags,
  addOrRemoveExcludeTag,
}) => {
  return (
    <>
      <div css={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
        <span css={{ fontWeight: "bold", marginRight: "1rem" }}>
          Include tags
        </span>
        <TagsButton
          selectedTags={includeTags}
          addOrRemoveTag={addOrRemoveIncludeTag}
          removeAllTags={removeAllIncludeTags}
        />
        <div css={{ fontSize: 14, color: "gray", marginLeft: "20px" }}>
          When you select tags, suggested problems are related to the topic.
        </div>
      </div>
      <Stack direction="row" sx={{ flexWrap: "wrap" }}>
        {includeTags.length > 0 &&
          includeTags.map((includeTag) => (
            <DeletableChip
              label={includeTag}
              key={includeTag}
              onDelete={() => removeIncludeTag(includeTag)}
            />
          ))}
      </Stack>
      <div css={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
        <span css={{ fontWeight: "bold", marginRight: "1rem" }}>
          Exclude tags
        </span>
        <TagsButton
          selectedTags={excludeTags}
          addOrRemoveTag={addOrRemoveExcludeTag}
          removeAllTags={removeAllExcludeTags}
        />
        <div css={{ fontSize: 14, color: "gray", marginLeft: "20px" }}>
          When you select tags, problems related to the tags will be excluded.
        </div>
      </div>
      <Stack direction="row" sx={{ flexWrap: "wrap" }}>
        {excludeTags.length > 0 &&
          excludeTags.map((excludeTag) => (
            <DeletableChip
              label={excludeTag}
              key={excludeTag}
              onDelete={() => removeExcludeTag(excludeTag)}
            />
          ))}
      </Stack>
    </>
  );
};
