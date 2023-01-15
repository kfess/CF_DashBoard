import { createTheme } from "@mui/material/styles";

export const baseTheme = createTheme({
  themeColor: "base",
  colors: { fontColor: "green", lineColor: "", backgroundColor: "white" },
});

export const purpleTheme = createTheme({
  themeColor: "purple",
  colors: { fontColor: "", lineColor: "", backgroundColor: "white" },
});

export const greenTheme = createTheme({
  themeColor: "green",
  colors: { fontColor: "", lineColor: "", backgroundColor: "white" },
});

export const darkTheme = createTheme({
  themeColor: "dark",
  colors: { fontColor: "red", lineColor: "", backgroundColor: "dark" },
});
