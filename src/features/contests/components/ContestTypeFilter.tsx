import React from "react";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import type { Classification } from "@features/contests/contest";
import { classifications } from "@features/contests/contest";

type Props = {
  classification: Classification;
  setClassification: (arg: Classification) => void;
};

export const ContestTypeFilter: React.FC<Props> = (props: Props) => {
  const { classification, setClassification } = props;

  return (
    <DropDownMenuButton
      title="Contest Type"
      items={classifications}
      selectedItem={classification}
      setSelectedItem={setClassification}
    />
  );
};
