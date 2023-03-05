import { useState } from "react";
import { Tag } from "@features/problems/problem";

export const useTags = () => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const addTag = (tag: Tag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const removeTag = (tag: Tag) => {
    setSelectedTags([
      ...selectedTags.filter((selectedTag) => selectedTag !== tag),
    ]);
  };

  const addOrRemoveTag = (tag: Tag) => {
    selectedTags.includes(tag)
      ? setSelectedTags([
          ...selectedTags.filter((selectedTag) => selectedTag !== tag),
        ])
      : setSelectedTags([...selectedTags, tag]);
  };
  const removeAllTags = () => {
    setSelectedTags([]);
  };

  return { selectedTags, addTag, removeTag, removeAllTags, addOrRemoveTag };
};
