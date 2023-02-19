import React from "react";
import { css } from "@emotion/react";

const circle = css({
  borderStyle: "solid",
  borderWidth: "thin",
  display: "inline-block",
  borderRadius: "50%",
  paddingTop: "10px",
  paddingLeft: "10px",
  marginRight: "5px",
});

type Props = {
  color: string;
  fillPercent?: number;
  width?: string;
  height?: string;
};

export const ColoredCircle: React.FC<Props> = (props: Props) => {
  const { color, fillPercent, width, height } = props;

  return (
    <span
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
