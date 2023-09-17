import React from "react";
import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/material/Box";

interface Props extends BoxProps {
  message: React.ReactNode;
}

export const SubNavigation: React.FC<Props> = ({ message, ...props }) => {
  return <Box {...props}>{message}</Box>;
};
