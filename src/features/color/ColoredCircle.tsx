import React from "react";
import { css } from "@emotion/react";

const circle = css({
  borderStyle: "solid",
  borderWidth: "thin",
  display: "inline-block",
  borderRadius: "50%",
  padding: "5px",
  margin: "0 5px",
});

type Props = {
  color: string;
  fillPercent?: number;
  width?: string;
  height?: string;
};

export const ColoredCircle: React.FC<Props> = (props: Props) => {
  const { color, fillPercent = 1, width, height } = props;

  return (
    <span
      aria-label="colored circle"
      css={[
        circle,
        {
          width: width,
          height: height,
          borderColor: color,
          background: `border-box linear-gradient(to top,
       ${color} ${(fillPercent ?? 1) * 100}%,
       rgba(0,0,0,0) ${(fillPercent ?? 1) * 100}%)`,
        },
      ]}
    />
  );
};
