import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { useThemeContext } from "@features/color/themeColor.hook";
import {
  getColorCodeFromRating,
  calcFillPercent,
} from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/ColoredCircle";

// 'rating' means "A person's rating"
// 'difficulty' means the "Difficulty of a problem"
type DisplayPurpose = "rating" | "difficulty";
type Props = {
  displayPurpose: DisplayPurpose;
  rating?: number;
  solvedCount?: number;
  width?: string;
  height?: string;
};

export const TopcoderLikeCircle: React.FC<Props> = (props: Props) => {
  const { displayPurpose, rating, solvedCount } = props;

  const { theme } = useThemeContext();

  const color = getColorCodeFromRating(rating, theme.themeColor);
  const fillPercent = calcFillPercent(rating);

  const tooltipMsg =
    displayPurpose === "rating"
      ? `Rating: ${rating ?? "?"}`
      : displayPurpose === "difficulty"
      ? `Difficulty: ${rating ?? "?"}, Solved by ${solvedCount ?? "?"}`
      : "";

  return (
    <Tooltip title={tooltipMsg}>
      <span>
        <ColoredCircle color={color} fillPercent={fillPercent} />
      </span>
    </Tooltip>
  );
};
