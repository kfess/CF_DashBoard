import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select as MUISelect } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/system";
import InputBase from "@mui/material/InputBase";

const StyledInputElement = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(0.1, 1.2),
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

type StyledSelectProps = {
  label: string;
  value: any;
  options: { value: any; label: string }[];
  onChange: (value: any) => void;
};

export const Select: React.FC<StyledSelectProps> = ({
  value,
  options,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <MUISelect
        value={value}
        onChange={handleChange}
        input={<StyledInputElement />}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};
