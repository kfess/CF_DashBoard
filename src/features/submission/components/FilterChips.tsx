import React from "react";
import Chip from "@mui/material/Chip";
import { VerdictFilter } from "./SolvedStatusFilter";
import type { LanguageFilter } from "@features/submission/components/LanguageFilter";

type Props = {
  solvedStatus: VerdictFilter;
  setSolvedStatus: (arg: VerdictFilter) => void;
  language: LanguageFilter;
  setLanguage: (arg: LanguageFilter) => void;
};

export const FilterChips: React.FC<Props> = (props: Props) => {
  const { solvedStatus, setSolvedStatus, language, setLanguage } = props;

  return <></>;
};
