// This file is required for the override of mui Theme
import "@mui/material/styles";

export type ThemeColor = "base" | "purple" | "green" | "dark";
type Colors = {
  fontColor: string;
  lineColor: string;
  backgroundColor: string; // image color of the theme
  foregroundColor: string; // foregroundColor of the backgroundColor
  mainColor: string; // add when needed
  //   subTextColor: string // add when needed
  //   titleBackgroudColor: string // add when needed
  //   accentColor: string // add when needed
  //   stageColor: string // add when needed
};

declare module "@mui/material/styles" {
  interface Theme {
    themeColor: ThemeColor;
    colors: Colors;
  }

  interface ThemeOptions {
    themeColor?: ThemeColor;
    colors?: Colors;
  }
}
