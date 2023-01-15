// This file is required for the override of emotion Theme
import "@emotion/react";

export type Theme = "base" | "purple" | "green" | "dark";
type Colors = {
  fontColor: string;
  lineColor: string;
  backgroundColor: string;
  //   mainColor: string // add when needed
  //   subTextColor: string // add when needed
  //   titleBackgroudColor: string // add when needed
  //   accentColor: string // add when needed
  //   stageColor: string // add when needed
};

declare module "@emotion/react" {
  export interface ThemeColor {
    themeColor: Theme;
    colors: Colors;
  }
}
