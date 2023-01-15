import { createTheme, Theme } from "@mui/material/styles";

export const baseThemeColor = createTheme({
  themeColor: "base",
  colors: { fontColor: "red", lineColor: "", backgroundColor: "white" },
});

export const purpleThemeColor = createTheme({
  themeColor: "purple",
  colors: { fontColor: "", lineColor: "", backgroundColor: "white" },
});

export const greenThemeColor = createTheme({
  themeColor: "green",
  colors: { fontColor: "", lineColor: "", backgroundColor: "white" },
});

export const darkThemeColor = createTheme({
  themeColor: "dark",
  colors: { fontColor: "", lineColor: "", backgroundColor: "dark" },
});
