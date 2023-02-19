import React from "react";
import Chip from "@mui/material/Chip";
import { Tag } from "@features/problems/problem";

type Props = { selectedTags: Tag[]; removeTag: (tag: Tag) => void };

export const SelectedTagChips: React.FC<Props> = (props: Props) => {
  const { selectedTags, removeTag } = props;

  return (
    <div>
      {selectedTags.length > 0 &&
        selectedTags.map((selectedTag) => (
          <Chip
            key={selectedTag}
            label={selectedTag}
            onClick={() => {}}
            onDelete={() => removeTag(selectedTag)}
            size="medium"
          />
        ))}
    </div>
  );
};
