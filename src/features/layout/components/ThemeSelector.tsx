import React from "react";
import { useThemeContext } from "@features/color/themeColor.hook";
import { makeStyles } from "@mui/material";

export const ThemeSelector: React.FC = () => {
  const { theme, setBaseTheme, setDarkTheme, setGreenTheme, setPurpleTheme } =
    useThemeContext();

  return <></>;
};
