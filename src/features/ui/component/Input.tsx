import * as React from "react";
import InputBase from "@mui/material/InputBase";
import { InputUnstyledProps } from "@mui/base/InputUnstyled";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

export type InputProps = InputUnstyledProps & {
  inputHeight?: string;
};

const StyledInputElement = styled(InputBase)(({ theme }) => ({
  boxSizing: "border-box",
  lineHeight: "1",
  fontSize: "1rem",
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]}`,
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[900] : "#fff",
  "&.Mui-focused": {
    boxShadow: `0 0 0 0.2rem #9246FF`,
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
    boxSizing: "border-box",
  },
  width: "100%",
  flexGrow: 1,
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
