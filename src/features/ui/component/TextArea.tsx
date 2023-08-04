import * as React from "react";
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

const StyledTextareaElement = styled("textarea")<InputUnstyledProps>(
  ({ theme }) => `
  resize: vertical;
  min-height: 50px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  padding: ${theme.spacing(1, 1.2)};
  border-radius: 0.375rem;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:focus {
    box-shadow: 0 0 0 0.2rem #9246FF;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export const TextArea = React.forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <InputUnstyled
      slots={{ input: StyledTextareaElement }}
      {...props}
      ref={ref}
    />
  );
});
