import React from "react";
import { DropDownMenuButton } from "@features/ui/component/DropDownMenuButton";
import {
  getColorCodeFromRating,
  ratingColor,
  ratingColorInfo,
} from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/components/ColoredCircle";

type FromDifficultyProps = {
  lowerDifficulty: number;
  onSelectFromDifficulty: (arg: number) => void;
};

export const FromDifficultyButton: React.FC<FromDifficultyProps> = ({
  lowerDifficulty,
  onSelectFromDifficulty,
}) => {
  const lowerDifficulties = ratingColor.map(
    (color) => ratingColorInfo[color].lowerBound
  );

  return (
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
  );
};

type ToDifficultyProps = {
  upperDifficulty: number;
  onSelectToDifficulty: (arg: number) => void;
};

export const ToDifficultyButton: React.FC<ToDifficultyProps> = ({
  upperDifficulty,
  onSelectToDifficulty,
}) => {
  const upperDifficulties = ratingColor.map(
    (color) => ratingColorInfo[color].upperBound
  );

  return (
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
  );
};
