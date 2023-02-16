import React from "react";
import { css } from "@emotion/react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import type { Classification } from "@features/contests/contest";
import { ContestTypeFilter } from "./ContestTypeFilter";
import { SolvedStatus, SolvedStatusFilter } from "./SolvedStatusFilter";
import { PeriodFilterButton, PeriodWord } from "./PeriodFilter";
import { ResetFilterButton } from "@features/contests/components/ResetFilter";

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
  showDifficulty: boolean;
  toggleShowDifficulty: (arg: boolean) => void;
  reverse: boolean;
  toggleOrder: (arg: boolean) => void;
};

export const FilterOptions: React.FC<Props> = React.memo((props: Props) => {
  const {
    classification,
    setClassification,
    period,
    setPeriod,
    solvedStatus,
    setSolvedStatus,
    showDifficulty,
    toggleShowDifficulty,
    reverse,
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
      <div css={buttonsCss}>
        <ShowDifficltySwitch
          showDifficulty={showDifficulty}
          toggleShowDifficulty={toggleShowDifficulty}
        />
        <ShowACStatusSwitch />
        <PinTableHeaderSwitch />
        <OrderSwitch reverse={reverse} toggleOrder={toggleOrder} />
      </div>
    </>
  );
});

const ShowDifficltySwitch: React.FC<
  Pick<Props, "showDifficulty" | "toggleShowDifficulty">
> = (props: Pick<Props, "showDifficulty" | "toggleShowDifficulty">) => {
  const { showDifficulty, toggleShowDifficulty } = props;

  return (
    <FormControlLabel
      control={<Switch defaultChecked />}
      label="Show Difficulty"
      onChange={() => toggleShowDifficulty(!showDifficulty)}
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

const OrderSwitch: React.FC<Pick<Props, "reverse" | "toggleOrder">> = (
  props: Pick<Props, "reverse" | "toggleOrder">
) => {
  const { reverse, toggleOrder } = props;

  return (
    <FormControlLabel
      control={<Switch defaultChecked={false} />}
      label="Reverse Order"
      onChange={() => toggleOrder(!reverse)}
    />
  );
};
