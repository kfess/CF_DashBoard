import { createContext, useContext, useState, useEffect } from "react";
import { ReactNode, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#9246FF",
      light: "#a76bff",
      dark: "#6631b2",
      contrastText: "#ffffff",
    },
    success: {
      main: "#1D883D",
      light: "#4a9f63",
      dark: "#145f2a",
      contrastText: "#ffffff",
    },
  },
  colors: {
    acColor: "#c3e6cb",
    waColor: "#FFEEBA",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#320064",
      contrastText: "#353535",
    },
    background: {
      paper: "#0D1116",
      default: "#0D1116",
    },
  },
  colors: {
    acColor: "#4a9f63",
    waColor: "#FFEEBA",
  },
});

const Context = createContext<{ toggleTheme: () => void }>({
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? darkTheme : lightTheme;
  });

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const newTheme =
        currentTheme.palette.mode === "dark" ? lightTheme : darkTheme;
      localStorage.setItem("theme", newTheme.palette.mode);
      return newTheme;
    });
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setTheme(storedTheme === "dark" ? darkTheme : lightTheme);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Context.Provider value={{ toggleTheme }}>{children}</Context.Provider>
    </ThemeProvider>
  );
};

export const useThemeContext = () => {
  const theme = useTheme();
  const { toggleTheme } = useContext(Context);
  return { theme, toggleTheme };
};
