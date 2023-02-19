import React, { useState } from "react";
import { ProblemsTable } from "@features/problems/components/ProblemsTable";
import { useFetchProblems } from "@features/problems/useFetchProblem";
import { TagsButton } from "@features/problems/components/TagsButton";
import { Tag } from "@features/problems/problem";
import { SelectedTagChips } from "@features/problems/components/SelectedTagChips";

export const ProblemsPage: React.FC = () => {
  const { data, isError, error, isLoading } = useFetchProblems();

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
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

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      <TagsButton
        selectedTags={selectedTags}
        addOrRemoveTag={addOrRemoveTag}
        removeAllTags={removeAllTags}
      />
      <SelectedTagChips selectedTags={selectedTags} removeTag={removeTag} />
      {data && <ProblemsTable problems={data} selectedTags={selectedTags} />}
    </>
  );
};
