import React from "react";
import { css } from "@emotion/react";

const circle = css({
  borderStyle: "solid",
  borderWidth: "thin",
  display: "inline-block",
  borderRadius: "50%", // circle shape
  paddingTop: "10px",
  paddingLeft: "10px",
  marginRight: "5px",
});

type Props = { color: string; fillPercent?: number };

export const ColoredCircle: React.FC<Props> = (props: Props) => {
  const { color, fillPercent } = props;

  return (
    <span
      css={[
        circle,
        {
          borderColor: color,
          background: `border-box linear-gradient(to top,
       ${color} ${(fillPercent ?? 1) * 100}%,
       rgba(0,0,0,0) ${(fillPercent ?? 1) * 100}%)`,
        },
      ]}
    />
  );
};
