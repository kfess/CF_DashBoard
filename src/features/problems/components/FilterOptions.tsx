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
import { useURLQuery } from "@hooks/useQueryParams";

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
  setShowTags: (arg: boolean) => void;
};

export const FilterOptions: React.FC<Props> = ({
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
  setShowTags,
}) => {
  const { setURLQuery } = useURLQuery();

  const onSelectClassification = (classification: Classification) => {
    setClassification(classification);
    setURLQuery({
      classification: classification === "All" ? undefined : classification,
    });
  };

  const onSelectFromDifficulty = (item: number) => {
    setLowerDifficulty(item);
    setURLQuery({ fromDifficulty: item });
  };

  const onResetFromDifficulty = () => {
    setLowerDifficulty(0);
    setURLQuery({ fromDifficulty: undefined });
  };

  const onSelectToDifficulty = (item: number) => {
    setUpperDifficulty(item);
    setURLQuery({ toDifficulty: item });
  };

  const onResetToDifficulty = () => {
    setUpperDifficulty(5000);
    setURLQuery({ toDifficulty: undefined });
  };

  const setDefaultClassification = () => {
    setClassification("All");
    setURLQuery({ classification: undefined });
  };

  const setDefaultSolvedStatus = () => {
    setSolvedStatus("All Problems");
    setURLQuery({ solvedStatus: undefined });
  };

  const addTag = (tag: Tag) => {
    const newTags = [...selectedTags, tag];
    setSelectedTags(newTags);
    setURLQuery({ tags: newTags });
  };

  const removeTag = (tag: Tag) => {
    const newTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
    setSelectedTags(newTags);
    setURLQuery({ tags: newTags.length ? newTags : undefined });
  };

  const removeAllTags = () => {
    setSelectedTags([]);
    setURLQuery({ tags: undefined });
  };

  const onSelectTag = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  };

  const onSelectSolvedStatus = (solvedStatus: SolvedStatus) => {
    setSolvedStatus(solvedStatus);
    setURLQuery({
      solvedStatus: solvedStatus === "All Problems" ? undefined : solvedStatus,
    });
  };

  return (
    <>
      <div css={buttonsCss}>
        <ContestTypeFilter
          classification={classification}
          onSelectClassification={onSelectClassification}
        />
        <DifficultyButton
          lowerDifficulty={lowerDifficulty}
          onSelectFromDifficulty={onSelectFromDifficulty}
          upperDifficulty={upperDifficulty}
          onSelectToDifficulty={onSelectToDifficulty}
        />
        <TagsButton
          selectedTags={selectedTags}
          onSelectTag={onSelectTag}
          removeAllTags={removeAllTags}
        />
        <SolvedStatusFilter
          solvedStatus={solvedStatus}
          onSelectSolvedStatus={onSelectSolvedStatus}
        />
        <ViewFilter showTags={showTags} toggleShowTags={toggleShowTags} />
        <ResetFilterButton
          setClassification={setClassification}
          setSolvedStatus={setSolvedStatus}
          removeAllTags={removeAllTags}
          setLowerDifficulty={setLowerDifficulty}
          setUpperDifficulty={setUpperDifficulty}
          setShowTags={setShowTags}
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
        upperDifficulty={upperDifficulty}
        onResetFromDifficulty={onResetFromDifficulty}
        onResetToDifficulty={onResetToDifficulty}
      />
    </>
  );
};
