import * as React from "react";
import { InputUnstyledProps } from "@mui/base/InputUnstyled";
import InputUnstyled from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";

const StyledTextareaElement = styled("textarea")(({ theme }) => ({
  resize: "vertical",
  minHeight: "60px",
  maxHeight: "200px",
  width: "100%",
  boxSizing: "border-box",
  fontSize: "1rem",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 1.2),
  color:
    theme.palette.mode === "dark"
      ? theme.palette.grey[200]
      : theme.palette.grey[900],
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[800] : "#fff",
  "&::placeholder": {
    color: theme.palette.grey[500],
  },
  border: `1px solid ${theme.palette.mode === "dark" ? "#1f272e" : "#E0E3E7"}`,
  "&:focus": {
    boxShadow: `0 0 0 0.12rem ${theme.palette.primary.main}`,
  },
  "&.Mui-error": {
    borderColor: theme.palette.error.main,
    "&:hover": {
      borderColor: theme.palette.error.main,
    },
  },
  // firefox
  "&:focus-visible": {
    outline: 0,
  },
}));

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
