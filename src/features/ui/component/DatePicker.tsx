import * as React from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker as MUIDatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";

interface Props extends DatePickerProps<Dayjs | string> {}

export const DatePicker: React.FC<Props> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker
        {...props}
        sx={{
          "& .MuiInputBase-root": {
            height: "2.5rem",
            "&:hover": {
              borderColor: "transparent",
            },
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? theme.palette.grey[800] : "#fff",
          },
        }}
      />
    </LocalizationProvider>
  );
};
