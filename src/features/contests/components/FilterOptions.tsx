import React from "react";
import { css } from "@emotion/react";
import type { Classification } from "@features/contests/contest";
import { ContestTypeFilter } from "./ContestTypeFilter";
import { SolvedStatus, SolvedStatusFilter } from "./SolvedStatusFilter";
import { PeriodFilterButton, PeriodWord } from "./PeriodFilter";
import { ResetFilterButton } from "@features/contests/components/ResetFilter";
import { FilterChips } from "@features/contests/components/FilterChips";
import { FilterOptionsState } from "../hooks/useFilterOptionsState";
import { ViewFilter } from "./ViewFilter";

const buttonsCss = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
});

type Props = {
  state: FilterOptionsState;
  showDifficulty: boolean;
  classification: Classification;
  setClassification: (arg: Classification) => void;
  period: PeriodWord;
  setPeriod: (arg: PeriodWord) => void;
  solvedStatus: SolvedStatus;
  setSolvedStatus: (arg: SolvedStatus) => void;
  toggleShowDifficulty: () => void;
  toggleShowACStatus: () => void;
  togglePinTableHeader: () => void;
  toggleReverse: () => void;
};

export const FilterOptions: React.FC<Props> = React.memo((props: Props) => {
  const {
    state,
    showDifficulty,
    classification,
    setClassification,
    period,
    setPeriod,
    solvedStatus,
    setSolvedStatus,
    toggleShowDifficulty,
    toggleShowACStatus,
    togglePinTableHeader,
    toggleReverse,
  } = props;

  return (
    <>
      <div css={buttonsCss}>
        <ContestTypeFilter
          classification={classification}
          setClassification={setClassification}
        />
        <PeriodFilterButton period={period} setPeriod={setPeriod} />
        <SolvedStatusFilter
          solvedStatus={solvedStatus}
          setSolvedStatus={setSolvedStatus}
        />
        <ViewFilter
          showDifficulty={showDifficulty}
          toggleShowDifficulty={toggleShowDifficulty}
          toggleShowACStatus={toggleShowACStatus}
          toggleReverse={toggleReverse}
          togglePinTableHeader={togglePinTableHeader}
        />
        <ResetFilterButton
          setClassification={setClassification}
          setPeriod={setPeriod}
          setSolvedStatus={setSolvedStatus}
        />
      </div>
      <FilterChips
        classification={classification}
        setDefaultClassification={() => {
          setClassification("All");
        }}
        period={period}
        setPeriod={() => {
          setPeriod("All Period");
        }}
        solvedStatus={solvedStatus}
        setSolvedStatus={setSolvedStatus}
      />
    </>
  );
});
