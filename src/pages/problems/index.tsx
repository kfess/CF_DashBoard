import React, { useState } from "react";
import { ProblemsTable } from "@features/problems/components/ProblemsTable";
import { useFetchProblems } from "@features/problems/useFetchProblem";
import { TagsButton } from "@features/problems/components/TagsButton";
import { Tag } from "@features/problems/problem";
import type { Classification } from "@features/contests/contest";
import { FilterChips } from "@features/problems/components/FilterChips";
import { ContestTypeFilter } from "@features/contests/components/ContestTypeFilter";
import { SolvedStatusFilter } from "@features/problems/components/SolvedStatusFilter";
import type { SolvedStatus } from "@features/problems/components/SolvedStatusFilter";
import { ResetFilterButton } from "@features/problems/components/ResetFilter";
import { ratingColorInfo } from "@features/color/ratingColor";
import { DifficultyButton } from "@features/problems/components/DifficultyButton";

export const ProblemsPage: React.FC = () => {
  const { data, isError, error, isLoading } = useFetchProblems();

  const [classification, setClassification] = useState<Classification>("All");
  const setDefaultClassification = () => {
    setClassification("All");
  };

  const [solvedStatus, setSolvedStatus] =
    useState<SolvedStatus>("All Problems");
  const setDefaultSolvedStatus = () => {
    setSolvedStatus("All Problems");
  };

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

  const [lowerDifficulty, setLowerDifficulty] = useState(
    ratingColorInfo.Gray.lowerBound
  );
  const [upperDifficulty, setUpperDifficulty] = useState(
    ratingColorInfo.DeepRed.upperBound
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <>
      <ContestTypeFilter
        classification={classification}
        setClassification={setClassification}
      />
      <SolvedStatusFilter
        solvedStatus={solvedStatus}
        setSolvedStatus={setSolvedStatus}
      />
      <DifficultyButton
        lowerDifficulty={lowerDifficulty}
        setLowerDifficulty={setLowerDifficulty}
        upperDifficulty={upperDifficulty}
        setUpperDifficulty={setUpperDifficulty}
      />
      <TagsButton
        selectedTags={selectedTags}
        addOrRemoveTag={addOrRemoveTag}
        removeAllTags={removeAllTags}
      />
      <ResetFilterButton
        setClassification={setClassification}
        setSolvedStatus={setSolvedStatus}
        removeAllTags={removeAllTags}
        setLowerDifficulty={setLowerDifficulty}
        setUpperDifficulty={setUpperDifficulty}
      />
      <FilterChips
        classification={classification}
        setDefaultClassification={setDefaultClassification}
        solvedStatus={solvedStatus}
        setDefaultSolvedStatus={setDefaultSolvedStatus}
        selectedTags={selectedTags}
        removeTag={removeTag}
        lowerDifficulty={lowerDifficulty}
        setLowerDifficulty={setLowerDifficulty}
        upperDifficulty={upperDifficulty}
        setUpperDifficulty={setUpperDifficulty}
      />
      {data && (
        <ProblemsTable
          problems={data}
          selectedTags={selectedTags}
          classification={classification}
          lowerDifficulty={lowerDifficulty}
          upperDifficulty={upperDifficulty}
        />
      )}
    </>
  );
};
