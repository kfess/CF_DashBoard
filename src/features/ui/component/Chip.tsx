import React from "react";
import { Chip as MuiChip, ChipProps as MuiChipProps } from "@mui/material";

export const Chip: React.FC<MuiChipProps> = (props: MuiChipProps) => {
  return (
    <MuiChip size="small" onClick={props.onClick ?? (() => {})} {...props} />
  );
};

export const DeletableChip: React.FC<MuiChipProps> = (props: MuiChipProps) => {
  return (
    <MuiChip
      size="small"
      onClick={props.onClick ?? (() => {})}
      onDelete={props.onDelete ?? (() => {})}
      {...props}
    />
  );
};
