import React from "react";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import type { Classification } from "@features/contests/contest";
import { classification } from "@features/contests/contest";

type Props = {
  tab: Classification;
  setTab: (arg: Classification) => void;
};

export const ContestTypeFilter: React.FC<Props> = (props: Props) => {
  const { tab, setTab } = props;

  return (
    <DropDownMenuButton
      title="Contest Type"
      items={classification}
      selectedItem={tab}
      setSelectedItem={setTab}
    />
  );
};
