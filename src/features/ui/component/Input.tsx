import * as React from "react";
import { InputUnstyledProps } from "@mui/base/InputUnstyled";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
};

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

const StyledInputElement = styled("input")(
  ({ theme }) => `
  height: 23px;
  width: 100%;
  font-size: 1rem;
  padding: 0.4rem;
  padding-left:0.875rem;
  border-radius: 0.375rem;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[600]};
    box-shadow: 0 0 0 2px ${
      theme.palette.mode === "dark" ? blue[500] : blue[400]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export const Input = React.forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { value, ...otherProps } = props;
  const inputValue = value === null || value === undefined ? "" : value;

  return (
    <InputUnstyled
      slots={{ input: StyledInputElement }}
      {...otherProps}
      value={inputValue}
      ref={ref}
    />
  );
});
