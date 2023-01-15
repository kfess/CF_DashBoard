import React from "react";
import { Tooltip } from "@mui/material";
import { css, useTheme, ThemeColor } from "@emotion/react";
import {
  getColorCodeFromRating,
  calcFillPercent,
} from "@features/color/ratingColor";

const circle = css({
  borderStyle: "solid",
  borderWidth: "thin",
  display: "inline-block",
  borderRadius: "50%", // circle shape
});

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
  const {
    displayPurpose,
    rating,
    solvedCount,
    width = "0.8rem", // default size
    height = "0.8rem", // default size
  } = props;

  const theme = useTheme();

  const [color, fillPercent] = [
    getColorCodeFromRating(rating),
    calcFillPercent(rating),
  ];

  const tooltipMsg =
    displayPurpose === "rating"
      ? `Rating: ${rating ?? "?"}`
      : displayPurpose === "difficulty"
      ? `Difficulty: ${rating ?? "?"}, Solved by ${solvedCount ?? "?"}`
      : "";

  return (
    <Tooltip title={tooltipMsg}>
      <span
        css={[
          circle,
          {
            borderColor: color,
            background: `border-box linear-gradient(to top,
             ${color} ${fillPercent * 100}%,
             rgba(0,0,0,0) ${fillPercent * 100}%)`,
            width: width,
            height: height,
          },
        ]}
      ></span>
    </Tooltip>
  );
};
