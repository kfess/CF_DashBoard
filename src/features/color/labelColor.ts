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

// HSL to HEX 変換関数
const hslToHex = (h: number, s: number, l: number) => {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// 高コントラストかつカラフルな色を生成する関数
export const generateHighContrastColor = () => {
  const h = Math.random();
  const s = 0.8 + Math.random() * 0.2;
  const l = 0.4 + Math.random() * 0.2;
  return hslToHex(h, s, l);
};
