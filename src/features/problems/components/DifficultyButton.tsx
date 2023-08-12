import React from "react";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import {
  getColorCodeFromRating,
  ratingColor,
  ratingColorInfo,
} from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/components/ColoredCircle";

const lowerDifficulties = ratingColor.map(
  (color) => ratingColorInfo[color].lowerBound
);

const upperDifficulties = ratingColor.map(
  (color) => ratingColorInfo[color].upperBound
);

type Props = {
  lowerDifficulty: number;
  onSelectFromDifficulty: (arg: number) => void;
  upperDifficulty: number;
  onSelectToDifficulty: (arg: number) => void;
};

export const DifficultyButton: React.FC<Props> = ({
  lowerDifficulty,
  onSelectFromDifficulty,
  upperDifficulty,
  onSelectToDifficulty,
}) => {
  return (
    <>
      <DropDownMenuButton
        title="From Difficulty"
        items={lowerDifficulties.map((ld) => {
          return {
            item: ld,
            startIcon: <ColoredCircle color={getColorCodeFromRating(ld)} />,
          };
        })}
        selectedItem={lowerDifficulty}
        onSelect={onSelectFromDifficulty}
      />
      <DropDownMenuButton
        title="To Difficulty"
        items={upperDifficulties.map((ud) => {
          return {
            item: ud,
            startIcon: <ColoredCircle color={getColorCodeFromRating(ud)} />,
          };
        })}
        selectedItem={upperDifficulty}
        onSelect={onSelectToDifficulty}
      />
    </>
  );
};
