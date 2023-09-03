import { useThemeContext } from "@global/theme";
import { IconButton } from "@features/ui/component/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";

export const ThemeSelector = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <IconButton
      onClick={toggleTheme}
      icon={
        theme.palette.mode === "light" ? <ModeNightIcon /> : <LightModeIcon />
      }
      aria-label="Toggle color theme"
    />
  );
};
