import * as React from "react";
import InputBase from "@mui/material/InputBase";
import { InputUnstyledProps } from "@mui/base/InputUnstyled";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";

export type InputProps = InputUnstyledProps & {
  inputHeight?: string;
};

const StyledInputElement = styled(InputBase)(({ theme }) => ({
  lineHeight: "1",
  fontSize: "1rem",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.mode === "dark" ? "#1f272e" : "#E0E3E7"}`,
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[900] : "#fff",
  "&.Mui-focused": {
    boxShadow: `0 0 0 0.12rem ${theme.palette.primary.main}`,
  },
  "&.Mui-error": {
    borderColor: theme.palette.error.main,
    "&:hover": {
      borderColor: theme.palette.error.main,
    },
  },
  "& input": {
    padding: theme.spacing(1, 1.2),
    height: "100%",
  },
  width: "100%",
}));

export const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { value, startAdornment, ...otherProps } = props;
  const inputValue = value === null || value === undefined ? "" : value;

  return (
    <InputUnstyled
      slots={{
        input: StyledInputElement,
      }}
      {...otherProps}
      value={inputValue}
      ref={ref}
    />
  );
});
