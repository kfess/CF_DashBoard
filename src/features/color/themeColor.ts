import { createTheme } from "@mui/material/styles";

export const baseTheme = createTheme({
  themeColor: "base",
  colors: {
    fontColor: "#4d5156", // google search, description color
    lineColor: "",
    backgroundColor: "#ffffff", // totally white
    foregroundColor: "#4d5156",
    acColor: "#98D59E",
    header: {
      backgroundColor: "#ffffff",
      foregroundColor: "#4d5156",
    },
  },
});

// Use brand image color of Heroku as reference color
export const purpleTheme = createTheme({
  themeColor: "purple",
  colors: {
    fontColor: "#4d5156",
    lineColor: "",
    backgroundColor: "#F7F8F9",
    foregroundColor: "#ffffff",
    acColor: "#98D59E",
    header: {
      backgroundColor: "#79589F", // image color of Heroku
      foregroundColor: "#ffffff",
    },
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
    header: {
      backgroundColor: "white",
      foregroundColor: "",
    },
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
    header: {
      backgroundColor: "#1C1C1C",
      foregroundColor: "#ffffff",
    },
  },
});
