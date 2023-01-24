import React from "react";
import { css } from "@emotion/react";
import Tooltip from "@mui/material/Tooltip";
import { useThemeContext } from "@features/color/themeColor.hook";
import {
  getColorCodeFromRating,
  calcFillPercent,
} from "@features/color/ratingColor";

const circle = css({
  borderStyle: "solid",
  borderWidth: "thin",
  display: "inline-block",
  borderRadius: "50%", // circle shape
  width: "10px",
  height: "10px",
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
  const { displayPurpose, rating, solvedCount } = props;

  const { theme } = useThemeContext();

  const [color, fillPercent] = [
    getColorCodeFromRating(rating, theme.themeColor),
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
            marginRight: theme.spacing(0.5),
          },
        ]}
      />
    </Tooltip>
  );
};
