import React from "react";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import type { VerdictFilter } from "@features/submission/submission";
import { verdictAbbrFilter } from "@features/submission/submission";

type Props = {
  verdictStatus: VerdictFilter;
  setVerdictStatus: (arg: VerdictFilter) => void;
};

export const VerdictFilterButton: React.FC<Props> = ({
  verdictStatus,
  setVerdictStatus,
}) => {
  return (
    <DropDownMenuButton
      title="Verdict"
      items={verdictAbbrFilter.map((verdict) => {
        return { item: verdict };
      })}
      selectedItem={verdictStatus}
      onSelect={setVerdictStatus}
    />
  );
};
