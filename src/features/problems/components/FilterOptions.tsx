import React from "react";
import type { Tag } from "@features/problems/problem";
import { TagsButton } from "@features/problems/components/TagsButton";
import type { Classification } from "@features/contests/contest";
import { ContestTypeFilter } from "@features/contests/components/ContestTypeFilter";
import {
  SolvedStatus,
  SolvedStatusFilter,
} from "@features/problems/components/SolvedStatusFilter";
import { ResetFilterButton } from "@features/problems/components/ResetFilter";
import { DifficultyButton } from "@features/problems/components/DifficultyButton";
import { FilterChips } from "@features/problems/components/FilterChips";

type Props = {
  classification: Classification;
  setClassification: (arg: Classification) => void;
  solvedStatus: SolvedStatus;
  setSolvedStatus: (arg: SolvedStatus) => void;
  selectedTags: Tag[];
  setSelectedTags: (arg: Tag[]) => void;
  lowerDifficulty: number;
  setLowerDifficulty: (arg: number) => void;
  upperDifficulty: number;
  setUpperDifficulty: (arg: number) => void;
};

export const FilterOptions: React.FC<Props> = (props: Props) => {
  const {
    classification,
    setClassification,
    solvedStatus,
    setSolvedStatus,
    selectedTags,
    setSelectedTags,
    lowerDifficulty,
    setLowerDifficulty,
    upperDifficulty,
    setUpperDifficulty,
  } = props;

  const setDefaultClassification = () => {
    setClassification("All");
  };

  const setDefaultSolvedStatus = () => {
    setSolvedStatus("All Problems");
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
    </>
  );
};
