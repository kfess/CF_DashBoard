import React from "react";
import { HexaColor } from "@features/color/labelColor";

const vividColors = [
  "#FF0000",
  "#FFA500",
  "#FFD700",
  "#008000",
  "#008B8B",
  "#4169E1",
  "#0000FF",
  "#8A2BE2",
] as const;

const paleColors = [
  "#FFB6C1",
  "#FFDEAD",
  "#F0E68C",
  "#9ACD32",
  "#3CB371",
  "#6495ED",
  "#4169E1",
  "#9370DB",
] as const;

type Props = {
  setColor: (arg: HexaColor) => void;
};

export const ColorPalette: React.FC<Props> = (props: Props) => {
  const { setColor } = props;

  return (
    <>
      <div css={{ marginBottom: "0.3rem" }}>Choose from popular colors</div>
      {vividColors.map((c) => {
        return (
          <span
            key={c}
            css={{
              cursor: "pointer",
              marginRight: "0.1rem",
              marginLeft: "0.1rem",
            }}
          >
            <span
              onClick={() => {
                setColor(c as HexaColor);
              }}
              css={{
                display: "inline-block",
                width: "1.2rem",
                height: "1.2rem",
                borderRadius: "100%",
                backgroundColor: c,
              }}
            ></span>
          </span>
        );
      })}
      <div></div>
      {paleColors.map((c) => {
        return (
          <span
            key={c}
            css={{
              cursor: "pointer",
              marginRight: "0.1rem",
              marginLeft: "0.1rem",
            }}
          >
            <span
              onClick={() => {
                setColor(c as HexaColor);
              }}
              css={{
                display: "inline-block",
                width: "1.2rem",
                height: "1.2rem",
                borderRadius: "100%",
                backgroundColor: c,
              }}
            ></span>
          </span>
        );
      })}
    </>
  );
};
