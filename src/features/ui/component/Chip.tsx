import React from "react";
import { noop } from "@helpers/misc";
import { Chip as MuiChip, ChipProps as MuiChipProps } from "@mui/material";

export const Chip: React.FC<MuiChipProps> = (props: MuiChipProps) => {
  return (
    <MuiChip
      component="div"
      size="small"
      onClick={props.onClick ?? noop}
      {...props}
    />
  );
};

export const DeletableChip: React.FC<MuiChipProps> = (props: MuiChipProps) => {
  return (
    <MuiChip
      component="div"
      size="small"
      onClick={props.onClick ?? noop}
      onDelete={props.onDelete ?? noop}
      {...props}
    />
  );
};
