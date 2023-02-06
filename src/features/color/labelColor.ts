declare const hexaColorNominality: unique symbol;
export type HexaColor = string & { [hexaColorNominality]: never };

const isHexaColor = (value: string): value is HexaColor => {
  return /^#[0-9a-fA-F]{6}$/.test(value) || /^#[0-9a-fA-F]{3}$/.test(value);
};

export const generateRandomHexaColor = (): HexaColor => {
  const colorChars = Array.from({ length: 7 }, (_, i) => {
    if (i === 0) {
      return "#";
    } else {
      return ((16 * Math.random()) | 0).toString(16);
    }
  });

  return colorChars.join("") as HexaColor;
};

export const isValidHexaColor = (color: string): boolean =>
  /^#[0-9a-fA-F]{6}$/.test(color) || /^#[0-9a-fA-F]{3}$/.test(color);
