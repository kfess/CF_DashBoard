import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { baseThemeColor } from "@features/color/themeColor";
import { Button } from "@mui/material";

export const DevContainer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider theme={baseThemeColor}>{children}</ThemeProvider>
    </>
  );
};
