import React from "react";
import { css } from "@emotion/react";
import StarIcon from "@mui/icons-material/Star";

const circleCss = css({
  cursor: "pointer",
  borderRadius: "50%",
  display: "inline-block",
  paddingTop: "3px",
  paddingLeft: "4px",
  paddingRight: "4px",
  backgroundColor: "#EFEFEF",
  color: "#93A1B0",
  "&:hover": { color: "#666" },
});

export const LabelIcon: React.FC = () => {
  return (
    <span css={circleCss}>
      <StarIcon fontSize="inherit" />
    </span>
  );
};
