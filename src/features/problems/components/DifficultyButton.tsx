import React, { ReactNode } from "react";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import { ratingColor, ratingColorInfo } from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/ColoredCircle";

const lowerDifficulties = ratingColor.map(
  (color) => ratingColorInfo[color].lowerBound
);

const upperDifficulties = ratingColor.map(
  (color) => ratingColorInfo[color].upperBound
);

const ColoredCircles: ReactNode[] = ratingColor.map((color) => (
  <ColoredCircle key={color} color={ratingColorInfo[color].colorCode} />
));

type Props = {
  lowerDifficulty: number;
  setLowerDifficulty: (arg: number) => void;
  upperDifficulty: number;
  setUpperDifficulty: (arg: number) => void;
};

export const DifficultyButton: React.FC<Props> = (props: Props) => {
  const {
    lowerDifficulty,
    setLowerDifficulty,
    upperDifficulty,
    setUpperDifficulty,
  } = props;

  return (
    <>
      <DropDownMenuButton
        title="From Difficulty"
        items={lowerDifficulties}
        selectedItem={lowerDifficulty}
        setSelectedItem={setLowerDifficulty}
        startIcons={ColoredCircles}
      />
      <DropDownMenuButton
        title="To Difficulty"
        items={upperDifficulties}
        selectedItem={upperDifficulty}
        setSelectedItem={setUpperDifficulty}
        startIcons={ColoredCircles}
      />
    </>
  );
};
