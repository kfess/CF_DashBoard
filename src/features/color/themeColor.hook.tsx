import {
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  createContext,
  ReactNode,
  useCallback,
} from "react";
import { Theme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import {
  baseTheme,
  purpleTheme,
  greenTheme,
  darkTheme,
} from "@features/color/themeColor";

const Context = createContext<{
  setBaseTheme: Dispatch<SetStateAction<Theme>>;
  setPurpleTheme: Dispatch<SetStateAction<Theme>>;
  setGreenTheme: Dispatch<SetStateAction<Theme>>;
  setDarkTheme: Dispatch<SetStateAction<Theme>>;
}>({
  setBaseTheme: () => {},
  setPurpleTheme: () => {},
  setGreenTheme: () => {},
  setDarkTheme: () => {},
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(purpleTheme);

  const setBaseTheme = useCallback(() => setTheme(baseTheme), [theme]);
  const setPurpleTheme = useCallback(() => setTheme(purpleTheme), [theme]);
  const setGreenTheme = useCallback(() => setTheme(greenTheme), [theme]);
  const setDarkTheme = useCallback(() => setTheme(darkTheme), [theme]);

  return (
    <ThemeProvider theme={theme}>
      <Context.Provider
        value={{ setBaseTheme, setPurpleTheme, setGreenTheme, setDarkTheme }}
      >
        {children}
      </Context.Provider>
    </ThemeProvider>
  );
};

export const useThemeContext = () => {
  const theme = useTheme();
  const { setBaseTheme, setPurpleTheme, setGreenTheme, setDarkTheme } =
    useContext(Context);

  return { theme, setBaseTheme, setPurpleTheme, setGreenTheme, setDarkTheme };
};
