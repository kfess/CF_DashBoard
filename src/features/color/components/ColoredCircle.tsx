import React from "react";
import { styled } from "@mui/system";

const StyledCircle = styled("span", {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "fillPercent",
})<{
  color: string;
  fillPercent?: number;
  width?: string;
  height?: string;
}>(({ color, fillPercent = 1 }) => ({
  borderStyle: "solid",
  borderWidth: "thin",
  display: "inline-block",
  borderRadius: "50%",
  padding: "5px",
  margin: "0 5px",
  borderColor: color,
  background: `linear-gradient(to top, ${color} ${
    (fillPercent ?? 1) * 100
  }%, rgba(0,0,0,0) ${(fillPercent ?? 1) * 100}%)`,
}));

type Props = {
  readonly color: string;
  readonly fillPercent?: number;
};

export const ColoredCircle: React.FC<Props> = (props: Props) => {
  const { color, fillPercent } = props;

  return (
    <StyledCircle
      aria-label="colored circle"
      color={color}
      fillPercent={fillPercent}
    />
  );
};
