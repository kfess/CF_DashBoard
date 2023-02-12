import React from "react";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import type { VerdictAbbr } from "@features/submission/submission";
import { verdictAbbr } from "@features/submission/submission";

export type VerdictFilter = VerdictAbbr | "All";
type Props = {
  solvedStatus: VerdictFilter;
  setSolvedStatus: (arg: VerdictFilter) => void;
};

export const SolvedStatusFilterButton: React.FC<Props> = (props: Props) => {
  const { solvedStatus, setSolvedStatus } = props;

  return (
    <DropDownMenuButton
      title="Solved Status"
      items={["All", ...verdictAbbr]}
      selectedItem={solvedStatus}
      setSelectedItem={setSolvedStatus}
    />
  );
};
