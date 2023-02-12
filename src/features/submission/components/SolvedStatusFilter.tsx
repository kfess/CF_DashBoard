import React from "react";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import type { VerdictAbbr } from "@features/submission/submission";
import { verdictAbbr } from "@features/submission/submission";

export type SolvedStatus = VerdictAbbr | "All";
type Props = {
  solvedStatus: SolvedStatus;
  setSolvedStatus: (arg: SolvedStatus) => void;
};

export const SolvedStatusFilter: React.FC<Props> = (props: Props) => {
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
