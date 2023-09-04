import React from "react";
import { IconButton as MuiIconButton, IconButtonProps } from "@mui/material";

interface Props extends IconButtonProps {
  readonly icon: React.ReactNode;
  readonly isRound?: boolean;
}

export const IconButton: React.FC<Props> = ({
  icon,
  isRound = false,
  ...restProps
}) => {
  return (
    <MuiIconButton
      sx={{ borderRadius: isRound ? "50%" : "4px" }}
      disableTouchRipple
      {...restProps}
    >
      {icon}
    </MuiIconButton>
  );
};
