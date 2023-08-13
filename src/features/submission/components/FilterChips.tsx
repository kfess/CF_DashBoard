import React from "react";
import Stack from "@mui/material/Stack";
import { DeletableChip } from "@features/ui/component/Chip";
import type { VerdictFilter } from "../submission";
import type { LanguageFilter } from "@features/submission/components/LanguageFilter";
import { Classification } from "@features/contests/contest";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { getColorCodeFromClassification } from "@features/color/ratingColor";

type Props = {
  classification: Classification;
  setClassification: (arg: Classification) => void;
  verdictStatus: VerdictFilter;
  setVerdictStatus: (arg: VerdictFilter) => void;
  language: LanguageFilter;
  setLanguage: (arg: LanguageFilter) => void;
};

export const FilterChips: React.FC<Props> = ({
  classification,
  setClassification,
  verdictStatus,
  setVerdictStatus,
  language,
  setLanguage,
}) => {
  const [startColor, endColor] = getColorCodeFromClassification(classification);

  return (
    <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ my: 2 }}>
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
      {verdictStatus !== "All" && (
        <DeletableChip
          label={verdictStatus}
          onDelete={() => {
            setVerdictStatus("All");
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
