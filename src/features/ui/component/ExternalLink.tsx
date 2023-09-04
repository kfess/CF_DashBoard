import React from "react";
import { Link as MUILink, LinkProps } from "@mui/material";
import { useTheme } from "@mui/material";

interface Props extends LinkProps {
  label: React.ReactNode;
  color?: string;
  target?: string;
}

export const ExternalLink: React.FC<Props> = ({
  label,
  color,
  target = "_blank",
  ...restProps
}) => {
  const theme = useTheme();
  const textColor = color
    ? color
    : theme.palette.mode === "light"
    ? "#000000"
    : "#ffffff";

  return (
    <MUILink
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
};
