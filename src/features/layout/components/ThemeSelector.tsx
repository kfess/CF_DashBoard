import { useThemeContext } from "@global/theme";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";

export const ThemeSelector = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme}>
      {theme.palette.mode === "light" ? <ModeNightIcon /> : <LightModeIcon />}
    </IconButton>
  );
};
