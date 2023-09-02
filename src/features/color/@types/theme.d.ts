// This file is required for the override of mui Theme
import "@mui/material/styles";

export type Mode = "light" | "dark";
type AdditionalPalette = {
  acColor: string;
  waColor: string;
};

declare module "@mui/material/styles" {
  interface Theme {
    themeColor: Mode;
    colors: AdditionalPalette;
  }

  interface ThemeOptions {
    themeColor?: Mode;
    colors?: AdditionalPalette;
  }
}
