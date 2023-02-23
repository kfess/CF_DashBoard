import React from "react";
import { css } from "@emotion/react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import type { Classification } from "@features/contests/contest";
import { ContestTypeFilter } from "./ContestTypeFilter";
import { SolvedStatus, SolvedStatusFilter } from "./SolvedStatusFilter";
import { PeriodFilterButton, PeriodWord } from "./PeriodFilter";
import { ResetFilterButton } from "@features/contests/components/ResetFilter";
import { FilterChips } from "@features/contests/components/FilterChips";

const buttonsCss = css({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
});

type Props = {
  classification: Classification;
  setClassification: (arg: Classification) => void;
  period: PeriodWord;
  setPeriod: (arg: PeriodWord) => void;
  solvedStatus: SolvedStatus;
  setSolvedStatus: (arg: SolvedStatus) => void;
  toggleShowDifficulty: () => void;
  toggleOrder: () => void;
};

export const FilterOptions: React.FC<Props> = React.memo((props: Props) => {
  const {
    classification,
    setClassification,
    period,
    setPeriod,
    solvedStatus,
    setSolvedStatus,
    toggleShowDifficulty,
    toggleOrder,
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
        <ShowDifficltySwitch toggleShowDifficulty={toggleShowDifficulty} />
        <ShowACStatusSwitch />
        <PinTableHeaderSwitch />
        <OrderSwitch toggleOrder={toggleOrder} />
      </div>
    </>
  );
});

const ShowDifficltySwitch: React.FC<Pick<Props, "toggleShowDifficulty">> = (
  props: Pick<Props, "toggleShowDifficulty">
) => {
  const { toggleShowDifficulty } = props;

  return (
    <FormControlLabel
      control={<Switch defaultChecked={true} />}
      label="Show Difficulty"
      onChange={toggleShowDifficulty}
    />
  );
};

const ShowACStatusSwitch: React.FC = () => {
  return (
    <FormControlLabel
      control={<Switch defaultChecked />}
      label="Show AC Status"
    />
  );
};

const PinTableHeaderSwitch: React.FC = () => {
  return (
    <FormControlLabel
      control={<Switch defaultChecked={false} />}
      label="Pin Table Header"
    />
  );
};

const OrderSwitch: React.FC<Pick<Props, "toggleOrder">> = (
  props: Pick<Props, "toggleOrder">
) => {
  const { toggleOrder } = props;

  return (
    <FormControlLabel
      control={<Switch defaultChecked={false} />}
      label="Reverse Order"
      onChange={toggleOrder}
    />
  );
};
