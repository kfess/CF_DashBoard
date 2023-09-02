import React from "react";
import { useTheme } from "@mui/material";

type Props = {
  readonly href: string;
  readonly label: string;
  readonly color?: string;
  readonly backgroundColor?: string;
};

export const Link: React.FC<Props> = ({ href, label, color }) => {
  const theme = useTheme();
  const textColor = color
    ? color
    : theme.palette.mode === "light"
    ? "#000000"
    : "#ffffff";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      css={{
        color: textColor,
        "&:hover": {
          color: theme.palette.primary.main,
        },
      }}
    >
      {label}
    </a>
  );
};
