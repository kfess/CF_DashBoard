import React from "react";
import { css } from "@emotion/react";
import type { Tag } from "@features/problems/problem";
import type { Classification } from "@features/contests/contest";
import type { SolvedStatus } from "@features/problems/components/SolvedStatusFilter";
import { TagsButton } from "@features/problems/components/TagsButton";
import { ContestTypeFilter } from "@features/contests/components/ContestTypeFilter";
import { SolvedStatusFilter } from "@features/problems/components/SolvedStatusFilter";
import { ResetFilterButton } from "@features/problems/components/ResetFilter";
import { DifficultyButton } from "@features/problems/components/DifficultyButton";
import { FilterChips } from "@features/problems/components/FilterChips";
import { ViewFilter } from "./ViewFilter";
import { Problem } from "@features/problems/problem";
import { PickOneButton } from "@features/problems/components/PickOneButton";

const buttonsCss = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginTop: "0.5rem",
});

type Props = {
  problem: Problem;
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
  showTags: boolean;
  toggleShowTags: () => void;
};

export const FilterOptions: React.FC<Props> = (props: Props) => {
  const {
    problem,
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
    showTags,
    toggleShowTags,
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
      <div css={buttonsCss}>
        <ContestTypeFilter
          classification={classification}
          setClassification={setClassification}
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
        <SolvedStatusFilter
          solvedStatus={solvedStatus}
          setSolvedStatus={setSolvedStatus}
        />
        <ViewFilter showTags={showTags} toggleShowTags={toggleShowTags} />
        <ResetFilterButton
          setClassification={setClassification}
          setSolvedStatus={setSolvedStatus}
          removeAllTags={removeAllTags}
          setLowerDifficulty={setLowerDifficulty}
          setUpperDifficulty={setUpperDifficulty}
        />
        {problem && <PickOneButton problem={problem} />}
      </div>
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
