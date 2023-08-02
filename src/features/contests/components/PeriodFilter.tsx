import dayjs from "dayjs";
import React from "react";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";

const periodWords = [
  "All Period",
  "Within 1 week",
  "Within 1 month",
  "Within 3 months",
  "Within 6 months",
  "Within 1 years",
  "Within 3 years",
  "Within 5 years",
  "Within 10 years",
] as const;
export type PeriodWord = typeof periodWords[number];

type PeriodFilter = { [K in PeriodWord]: { from: number } };
export const periodFilter: PeriodFilter = {
  "All Period": { from: dayjs("1970-01-01").valueOf() },
  "Within 10 years": { from: dayjs().subtract(10, "years").valueOf() },
  "Within 5 years": { from: dayjs().subtract(5, "years").valueOf() },
  "Within 3 years": { from: dayjs().subtract(3, "years").valueOf() },
  "Within 1 years": { from: dayjs().subtract(1, "years").valueOf() },
  "Within 6 months": { from: dayjs().subtract(6, "months").valueOf() },
  "Within 3 months": { from: dayjs().subtract(3, "months").valueOf() },
  "Within 1 month": { from: dayjs().subtract(1, "month").valueOf() },
  "Within 1 week": { from: dayjs().subtract(1, "week").valueOf() },
};

type Props = {
  period: PeriodWord;
  setPeriod: (arg: PeriodWord) => void;
};

export const PeriodFilterButton: React.FC<Props> = ({ period, setPeriod }) => {
  return (
    <DropDownMenuButton
      title="Period"
      items={periodWords.map((periodWord) => {
        return { item: periodWord };
      })}
      selectedItem={period}
      setSelectedItem={setPeriod}
    />
  );
};
