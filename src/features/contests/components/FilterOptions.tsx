import React from "react";
import { css } from "@emotion/react";
import { Switch } from "@features/ui/component/Switch";
import type { Classification } from "@features/contests/contest";
import { ContestTypeFilter } from "./ContestTypeFilter";
import { SolvedStatus, SolvedStatusFilter } from "./SolvedStatusFilter";
import { PeriodFilterButton, PeriodWord } from "./PeriodFilter";
import { ResetFilterButton } from "@features/contests/components/ResetFilter";
import { FilterChips } from "@features/contests/components/FilterChips";
import { FilterOptionsState } from "../hooks/useFilterOptionsState";

const buttonsCss = css({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
});

type Props = {
  state: FilterOptionsState;
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
      <div css={buttonsCss}>
        <Switch
          label="Show Difficulty"
          checked={state.showDifficulty}
          onChange={toggleShowDifficulty}
        />
        <Switch
          label="Show AC Status"
          checked={state.showACStatus}
          onChange={toggleShowACStatus}
        />
        <Switch
          label="Pin Header"
          checked={state.pinTableHeader}
          onChange={togglePinTableHeader}
        />
        <Switch
          label="Reverse"
          checked={state.reverse}
          onChange={toggleReverse}
        />
      </div>
    </>
  );
});
