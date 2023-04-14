import React from "react";
import Stack from "@mui/material/Stack";
import type { Tag } from "@features/problems/problem";
import type { Classification } from "@features/contests/contest";
import { SolvedStatus } from "@features/problems/components/SolvedStatusFilter";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import {
  getColorCodeFromClassification,
  getColorCodeFromRating,
} from "@features/color/ratingColor";
import { DeletableChip } from "@features/ui/component/Chip";

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

  const [startColor, endColor] = getColorCodeFromClassification(classification);

  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", marginTop: "0.5rem" }}>
      {classification !== "All" && (
        <DeletableChip
          label={classification}
          onDelete={setDefaultClassification}
          icon={
            <>
              <ColoredCircle color={startColor} />-
              <ColoredCircle color={endColor} />
            </>
          }
        />
      )}
      {solvedStatus !== "All Problems" && (
        <DeletableChip label={solvedStatus} onDelete={setDefaultSolvedStatus} />
      )}
      {lowerDifficulty !== 0 && (
        <DeletableChip
          label={<div>from {lowerDifficulty}</div>}
          icon={
            <ColoredCircle color={getColorCodeFromRating(lowerDifficulty)} />
          }
          onDelete={() => setLowerDifficulty(0)}
        />
      )}
      {upperDifficulty !== 5000 && (
        <DeletableChip
          label={<div>to {upperDifficulty}</div>}
          icon={
            <ColoredCircle color={getColorCodeFromRating(upperDifficulty)} />
          }
          onDelete={() => setUpperDifficulty(5000)}
        />
      )}

      {selectedTags.length > 0 &&
        selectedTags.map((selectedTag) => (
          <DeletableChip
            label={selectedTag}
            key={selectedTag}
            onDelete={() => removeTag(selectedTag)}
          />
        ))}
    </Stack>
  );
};
