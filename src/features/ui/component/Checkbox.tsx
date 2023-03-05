import React, { ReactNode } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, Checkbox as MUICheckbox } from "@mui/material";

type Props = {
  readonly toggle: () => void;
  readonly label: ReactNode;
  readonly description?: ReactNode;
};

export const Checkbox: React.FC<Props> = (props: Props) => {
  const { toggle, label, description } = props;

  return (
    <div>
      <FormControlLabel
        control={<MUICheckbox size="small" disableRipple />}
        label={<div>{label}</div>}
        onChange={toggle}
      />
      {description && (
        <Box sx={{ paddingLeft: "28px", fontSize: 14, color: "gray" }}>
          {description}
        </Box>
      )}
    </div>
  );
};
