declare const hexaColorNominality: unique symbol;
export type HexaColor = string & { [hexaColorNominality]: never };

export const isValidHexaColor = (value: string): boolean =>
  /^#[0-9a-fA-F]{6}$/.test(value) || /^#[0-9a-fA-F]{3}$/.test(value);

export const generateRandomHexaColor = (): HexaColor => {
  const highContrastColor = (): string => {
    let value = Math.floor(Math.random() * 256);
    return value < 220 ? value.toString(16).padStart(2, "0") : "00";
  };
  return `#${highContrastColor()}${highContrastColor()}${highContrastColor()}` as HexaColor;
};
