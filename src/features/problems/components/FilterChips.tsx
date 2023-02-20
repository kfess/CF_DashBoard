import React from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { Tag } from "@features/problems/problem";
import type { Classification } from "@features/contests/contest";
import { SolvedStatus } from "@features/problems/components/SolvedStatusFilter";
import { ColoredCircle } from "@features/color/ColoredCircle";
import { getColorCodeFromRating } from "@features/color/ratingColor";

type Props = {
  classification: Classification;
  setDefaultClassification: () => void;
  solvedStatus: SolvedStatus;
  setDefaultSolvedStatus: () => void;
  selectedTags: Tag[];
  removeTag: (tag: Tag) => void;
  lowerDifficulty: number;
  setLowerDifficulty: (arg: number) => void;
  upperDifficulty: number;
  setUpperDifficulty: (arg: number) => void;
};

export const FilterChips: React.FC<Props> = (props: Props) => {
  const {
    classification,
    setDefaultClassification,
    solvedStatus,
    setDefaultSolvedStatus,
    selectedTags,
    removeTag,
    lowerDifficulty,
    setLowerDifficulty,
    upperDifficulty,
    setUpperDifficulty,
  } = props;

  return (
    <Stack direction="row" spacing={1}>
      {classification !== "All" && (
        <Chip
          label={classification}
          onClick={() => {}}
          onDelete={setDefaultClassification}
          size="small"
        />
      )}
      {solvedStatus !== "All Problems" && (
        <Chip
          label={solvedStatus}
          onClick={() => {}}
          onDelete={setDefaultSolvedStatus}
          size="small"
        />
      )}
      {lowerDifficulty !== 0 && (
        <Chip
          label={
            <div css={{ display: "inline-flex", alignItems: "center" }}>
              <div css={{ paddingRight: "5px" }}>from:</div>
              <ColoredCircle color={getColorCodeFromRating(lowerDifficulty)} />
              {lowerDifficulty}
            </div>
          }
          onClick={() => {}}
          onDelete={() => setLowerDifficulty(0)}
          size="small"
        />
      )}
      {upperDifficulty !== 5000 && (
        <Chip
          label={
            <div css={{ display: "inline-flex", alignItems: "center" }}>
              <div css={{ paddingRight: "5px" }}>to:</div>
              <ColoredCircle color={getColorCodeFromRating(upperDifficulty)} />
              {upperDifficulty}
            </div>
          }
          onClick={() => {}}
          onDelete={() => setUpperDifficulty(5000)}
          size="small"
        />
      )}
      {selectedTags.length > 0 &&
        selectedTags.map((selectedTag) => (
          <Chip
            key={selectedTag}
            label={selectedTag}
            onClick={() => {}}
            onDelete={() => removeTag(selectedTag)}
            size="small"
          />
        ))}
    </Stack>
  );
};
