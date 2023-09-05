import React from "react";
import { Link as MUILink, LinkProps } from "@mui/material";
import { useTheme } from "@mui/material";

interface Props extends LinkProps {
  label: React.ReactNode;
  color?: string;
  target?: string;
}

export const ExternalLink = React.forwardRef<HTMLAnchorElement, Props>(
  ({ label, color, target = "_blank", ...restProps }, ref) => {
    const theme = useTheme();
    const textColor = color
      ? color
      : theme.palette.mode === "light"
      ? "#000000"
      : "#ffffff";

    return (
      <MUILink
        ref={ref}
        component="a"
        target={target}
        rel="noopener noreferrer"
        underline="none"
        sx={{
          color: textColor,
          "&:hover": {
            color: theme.palette.primary.main,
            textDecoration: "underline",
          },
        }}
        {...restProps}
      >
        {label}
      </MUILink>
    );
  }
);
