import React from "react";
import { styled } from "@mui/system";

const StyledCircle = styled("span", {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "fillPercent",
})<{
  color: string;
  fillPercent?: number;
  width?: string;
  height?: string;
}>(({ theme, color, fillPercent = 1, width, height }) => ({
  borderStyle: "solid",
  borderWidth: "thin",
  display: "inline-block",
  borderRadius: "50%",
  padding: "5px",
  margin: "0 5px",
  width: width,
  height: height,
  borderColor: color,
  background: `linear-gradient(to top, ${color} ${
    (fillPercent ?? 1) * 100
  }%, rgba(0,0,0,0) ${(fillPercent ?? 1) * 100}%)`,
}));

type Props = {
  readonly color: string;
  readonly fillPercent?: number;
  readonly width?: string;
  readonly height?: string;
};

export const ColoredCircle: React.FC<Props> = (props: Props) => {
  const { color, fillPercent, width, height } = props;

  return (
    <StyledCircle
      aria-label="colored circle"
      color={color}
      fillPercent={fillPercent}
      width={width}
      height={height}
    />
  );
};
