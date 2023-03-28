import React from "react";
import type { Classification } from "@features/contests/contest";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { ColoredCircle } from "@features/color/components/ColoredCircle";
import { classifications } from "@features/contests/contest";
import { getColorCodeFromClassification } from "@features/color/ratingColor";

type Props = {
  classification: Classification;
  setClassification: (arg: Classification) => void;
};

export const ContestTypeFilter: React.FC<Props> = (props: Props) => {
  const { classification, setClassification } = props;

  const items = classifications.map((classification) => {
    const [startColor, endColor] =
      getColorCodeFromClassification(classification);
    return {
      item: classification,
      startIcon: (
        <>
          <ColoredCircle color={startColor} />-
          <ColoredCircle color={endColor} />
        </>
      ),
    };
  });

  return (
    <DropDownMenuButton
      title="Content Type"
      items={items}
      selectedItem={classification}
      setSelectedItem={setClassification}
    />
  );
};
