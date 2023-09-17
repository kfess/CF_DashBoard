import React, { ReactNode } from "react";
import { FormControl as MUIFormControl } from "@mui/material";
import { styled } from "@mui/system";

const CustomFormControl = styled(MUIFormControl)`
  // margin-top: 0.5rem;
  // margin-bottom: 0.5rem;
`;

type Props = { children: ReactNode };

export const FormControl: React.FC<Props> = ({ children }) => {
  return (
    <CustomFormControl sx={{ width: "100%" }}>{children}</CustomFormControl>
  );
};
