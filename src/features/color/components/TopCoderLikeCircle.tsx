import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material";
// import { useThemeContext } from "@features/color/themeColor.hook";
import {
  getColorCodeFromRating,
  calcFillPercent,
} from "@features/color/ratingColor";
import { ColoredCircle } from "@features/color/components/ColoredCircle";

type DisplayPurpose = "rating" | "difficulty";
type Props = {
  readonly displayPurpose: DisplayPurpose;
  readonly rating?: number;
  readonly solvedCount?: number;
};

export const TopcoderLikeCircle: React.FC<Props> = ({
  displayPurpose,
  rating,
  solvedCount,
}) => {
  const theme = useTheme();
  const color = getColorCodeFromRating(rating, theme.themeColor);
  const fillPercent = calcFillPercent(rating);

  const tooltipMsg =
    displayPurpose === "rating"
      ? `Rating: ${rating ?? "?"}`
      : `Difficulty: ${rating ?? "?"}, Solved by ${solvedCount ?? "?"}`;

  return (
    <Tooltip title={tooltipMsg}>
      <span>
        <ColoredCircle color={color} fillPercent={fillPercent} />
      </span>
    </Tooltip>
  );
};
