import { createTheme } from "@mui/material/styles";

export const baseTheme = createTheme({
  themeColor: "base",
  colors: {
    fontColor: "#4d5156", // google search, description color
    lineColor: "",
    backgroundColor: "#ffffff", // totally white
    foregroundColor: "#4d5156",
    mainColor: "white",
  },
});

// Use brand image color of Heroku as reference color
export const purpleTheme = createTheme({
  themeColor: "purple",
  colors: {
    fontColor: "",
    lineColor: "",
    backgroundColor: "#F7F3FA", // image color of Heroku
    foregroundColor: "#ffffff",
    mainColor: "#79589F",
  },
});

export const greenTheme = createTheme({
  themeColor: "green",
  colors: {
    fontColor: "",
    lineColor: "",
    backgroundColor: "white",
    foregroundColor: "",
    mainColor: "",
  },
});

export const darkTheme = createTheme({
  themeColor: "dark",
  colors: {
    fontColor: "",
    lineColor: "",
    backgroundColor: "dark",
    foregroundColor: "",
    mainColor: "",
  },
});
