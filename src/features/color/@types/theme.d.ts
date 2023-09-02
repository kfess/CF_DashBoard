// This file is required for the override of mui Theme
import "@mui/material/styles";

export type ThemeColor = "base" | "dark";
type AdditionalPalette = {
  acColor: string;
  waColor: string;
};

declare module "@mui/material/styles" {
  interface Theme {
    themeColor: ThemeColor;
    colors: AdditionalPalette;
  }

  interface ThemeOptions {
    themeColor?: ThemeColor;
    colors?: AdditionalPalette;
  }
}
