declare const hexaColorNominality: unique symbol;
export type HexaColor = string & { [hexaColorNominality]: never };

const isHexaColor = (value: string): value is HexaColor => {
  return /^#[0-9a-fA-F]{6}$/.test(value);
};

export const generateRandomHexaColor = (): HexaColor => {
  const colorArr = Array.from({ length: 7 }, (_, i) => {
    if (i === 0) {
      return "#";
    } else {
      return ((16 * Math.random()) | 0).toString(16);
    }
  });

  const color = colorArr.join("");
  if (isHexaColor(color)) {
    return color;
  } else {
    throw new Error("invalid HexaColor");
  }
};
