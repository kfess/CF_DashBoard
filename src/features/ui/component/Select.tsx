import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select as MUISelect, SelectProps } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/system";
import InputBase from "@mui/material/InputBase";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StyledInputElement = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(0.2, 1.2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.mode === "dark" ? "#1f272e" : "#E0E3E7"}`,
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[800] : "#fff",
  "&.Mui-focused": {
    boxShadow: `0 0 0 0.12rem ${theme.palette.primary.main}`,
  },
  "&.Mui-error": {
    borderColor: theme.palette.error.main,
    "&:hover": {
      borderColor: theme.palette.error.main,
    },
  },
}));
interface StyledSelectProps<T> extends Omit<SelectProps, "onChange"> {
  label: string;
  options: { value: T; label: React.ReactNode }[];
  onChange: (value: T) => void;
}

export const Select = <T extends string | number>({
  label,
  options,
  onChange,
  ...props
}: StyledSelectProps<T>) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = options.find(
      (option) => option.value.toString() === (event.target.value as string)
    );
    if (value !== undefined) {
      onChange(value.value);
    }
  };

  return (
    <FormControl fullWidth>
      <MUISelect
        label={label}
        onChange={handleChange}
        input={<StyledInputElement />}
        MenuProps={MenuProps}
        {...props}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value.toString()}
            value={option.value.toString()}
          >
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};
