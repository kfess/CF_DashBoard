import React from "react";
import Stack from "@mui/material/Stack";
import { DeletableChip } from "@features/ui/component/Chip";
import { VerdictFilter } from "./SolvedStatusFilter";
import type { LanguageFilter } from "@features/submission/components/LanguageFilter";
import { Classification } from "@features/contests/contest";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { getColorCodeFromClassification } from "@features/color/ratingColor";

type Props = {
  classification: Classification;
  setClassification: (arg: Classification) => void;
  solvedStatus: VerdictFilter;
  setSolvedStatus: (arg: VerdictFilter) => void;
  language: LanguageFilter;
  setLanguage: (arg: LanguageFilter) => void;
};

export const FilterChips: React.FC<Props> = ({
  classification,
  setClassification,
  solvedStatus,
  setSolvedStatus,
  language,
  setLanguage,
}) => {
  const [startColor, endColor] = getColorCodeFromClassification(classification);

  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", marginTop: "0.5rem" }}>
      {classification !== "All" && (
        <DeletableChip
          label={classification}
          onDelete={() => {
            setClassification("All");
          }}
          icon={
            <>
              <ColoredCircle color={startColor} />-
              <ColoredCircle color={endColor} />
            </>
          }
        />
      )}
      {solvedStatus !== "All" && (
        <DeletableChip
          label={solvedStatus}
          onDelete={() => {
            setSolvedStatus("All");
          }}
        />
      )}
      {language !== "All" && (
        <DeletableChip
          label={language}
          onDelete={() => {
            setLanguage("All");
          }}
        />
      )}
    </Stack>
  );
};
