import React from "react";
import { DropDownMenuButton_ } from "@features/ui/component/DropDownMenuButton";
import type { Classification } from "@features/contests/contest";
import { classifications } from "@features/contests/contest";
import { ratingColorInfo } from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/ColoredCircle";

type Props = {
  classification: Classification;
  setClassification: (arg: Classification) => void;
};

export const ContestTypeFilter: React.FC<Props> = (props: Props) => {
  const { classification, setClassification } = props;

  const items = classifications.map((classification) => {
    const startColor =
      classification === "All" ||
      classification === "Div. 3" ||
      classification === "Div. 4" ||
      classification === "Educational" ||
      classification === "Global" ||
      classification === "ICPC" ||
      classification === "Kotlin Heros" ||
      classification === "Others"
        ? ratingColorInfo.Gray.colorCode
        : classification === "Div. 1"
        ? ratingColorInfo.LightOrange.colorCode
        : classification === "Div. 1 + Div. 2"
        ? ratingColorInfo.Violet.colorCode
        : ratingColorInfo.Blue.colorCode;

    const endColor =
      classification === "All" ||
      classification === "Educational" ||
      classification === "Global" ||
      classification === "ICPC" ||
      classification === "Kotlin Heros" ||
      classification === "Others" ||
      classification === "Div. 1" ||
      classification === "Div. 1 + Div. 2"
        ? ratingColorInfo.DeepRed.colorCode
        : classification === "Div. 2"
        ? ratingColorInfo.Violet.colorCode
        : classification === "Div. 3"
        ? ratingColorInfo.Cyan.colorCode
        : ratingColorInfo.Green.colorCode;

    return {
      item: classification,
      startIcon: (
        <>
          <ColoredCircle color={startColor} />~
          <ColoredCircle color={endColor} />
        </>
      ),
    };
  });

  return (
    <DropDownMenuButton_
      title="Content Type"
      items={items}
      selectedItem={classification}
      setSelectedItem={setClassification}
    />
  );
};
