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
  onResetFromDifficulty: () => void;
  upperDifficulty: number;
  onResetToDifficulty: () => void;
};

export const FilterChips: React.FC<Props> = ({
  classification,
  setDefaultClassification,
  solvedStatus,
  setDefaultSolvedStatus,
  selectedTags,
  removeTag,
  lowerDifficulty,
  onResetFromDifficulty,
  upperDifficulty,
  onResetToDifficulty,
}) => {
  const [startColor, endColor] = getColorCodeFromClassification(classification);

  return (
    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ marginTop: "1rem" }}>
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
          onDelete={onResetFromDifficulty}
        />
      )}
      {upperDifficulty !== 5000 && (
        <DeletableChip
          label={<div>to {upperDifficulty}</div>}
          icon={
            <ColoredCircle color={getColorCodeFromRating(upperDifficulty)} />
          }
          onDelete={onResetToDifficulty}
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
