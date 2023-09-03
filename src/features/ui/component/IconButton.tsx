import React from "react";
import { IconButton as MuiIconButton } from "@mui/material";

type Props = {
  icon: React.ReactNode;
  onClick?: () => void;
  isRound?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
};

export const IconButton: React.FC<Props> = ({
  icon,
  onClick,
  isRound = false,
  disabled = false,
  ariaLabel,
}) => {
  return (
    <MuiIconButton
      onClick={onClick}
      sx={{ borderRadius: isRound ? "50%" : "4px" }}
      aria-label={ariaLabel}
      disabled={disabled}
      disableTouchRipple
    >
      {icon}
    </MuiIconButton>
  );
};
