// import {
//   useState,
//   useContext,
//   createContext,
//   ReactNode,
//   useCallback,
// } from "react";
// import { Theme, ThemeProvider } from "@mui/material/styles";
// import { useTheme } from "@mui/material/styles";
// // import { baseTheme, darkTheme } from "@features/color/themeColor";

// const Context = createContext<{
//   setBaseTheme: () => void;
//   setDarkTheme: () => void;
// }>({
//   setBaseTheme: () => {},
//   setDarkTheme: () => {},
// });

// export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
//   const [theme, setTheme] = useState<Theme>(baseTheme);

//   const setBaseTheme = useCallback(() => setTheme(baseTheme), [theme]);
//   const setDarkTheme = useCallback(() => setTheme(darkTheme), [theme]);

//   return (
//     <ThemeProvider theme={theme}>
//       <Context.Provider value={{ setBaseTheme, setDarkTheme }}>
//         {children}
//       </Context.Provider>
//     </ThemeProvider>
//   );
// };

// export const useThemeContext = () => {
//   const theme = useTheme();
//   const { setBaseTheme, setDarkTheme } = useContext(Context);

//   return { theme, setBaseTheme, setDarkTheme };
// };
