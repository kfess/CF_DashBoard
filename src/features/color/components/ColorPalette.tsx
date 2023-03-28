import React from "react";
import { HexaColor } from "@features/color/labelColor";
import { ColoredCircle } from "@features/color//components/ColoredCircle";

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

export const ColorPalette: React.FC<Props> = ({ setColor }) => {
  const renderColorSwitch = (color: string) => (
    <span
      key={color}
      css={{ cursor: "pointer" }}
      onClick={() => setColor(color as HexaColor)}
    >
      <ColoredCircle color={color} />
    </span>
  );

  return (
    <>
      <div css={{ marginBottom: "0.3rem" }}>Choose from popular colors</div>
      {vividColors.map(renderColorSwitch)}
      <div></div>
      {paleColors.map(renderColorSwitch)}
    </>
  );
};
