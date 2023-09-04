import React from "react";
import { Link as MUILink } from "@mui/material";
import { useTheme } from "@mui/material";

// type Props = {
//   readonly href: string;
//   readonly label: string;
//   readonly color?: string;
//   readonly backgroundColor?: string;
// };

interface Props extends React.ComponentProps<typeof MUILink> {
  label: React.ReactNode;
  color?: string;
}

export const ExternalLink: React.FC<Props> = ({
  label,
  color,
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
      target="_blank"
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
