import { createTheme } from "@mui/material/styles";

export const baseTheme = createTheme({
  themeColor: "base",
  colors: {
    fontColor: "#4d5156", // google search, description color
    lineColor: "",
    backgroundColor: "#ffffff", // totally white
    foregroundColor: "#4d5156",
    acColor: "#98D59E",
  },
});

// Use brand image color of Heroku as reference color
export const purpleTheme = createTheme({
  themeColor: "purple",
  colors: {
    fontColor: "#4d5156",
    lineColor: "",
    backgroundColor: "#79589F", // image color of Heroku
    foregroundColor: "#ffffff",
    acColor: "#98D59E",
  },
});

export const greenTheme = createTheme({
  themeColor: "green",
  colors: {
    fontColor: "",
    lineColor: "",
    backgroundColor: "white",
    foregroundColor: "",
    acColor: "#98D59E",
  },
});

export const darkTheme = createTheme({
  themeColor: "dark",
  colors: {
    fontColor: "#ffffff",
    lineColor: "",
    backgroundColor: "#1C1C1C",
    foregroundColor: "#ffffff",
    acColor: "#98D59E",
  },
});
