import * as React from "react";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker as MUIDatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";

interface Props extends DatePickerProps<Dayjs | string> {}

export const DatePicker = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MUIDatePicker
          {...props}
          ref={ref}
          sx={{
            "& .MuiInputBase-root": {
              height: "2.2rem",
              borderColor: "transparent",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : "#fff",
            },
          }}
          slotProps={{ textField: { fullWidth: true } }} // to make the input field full width
        />
      </LocalizationProvider>
    );
  }
);

DatePicker.displayName = "DatePicker";
