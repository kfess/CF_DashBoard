import dayjs from "dayjs";
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@features/ui/component/DatePicker";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const ContestDate: React.FC<Props> = ({ control, errors }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Box width="50%">
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <>
              <label
                htmlFor="description-input"
                css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
              >
                Start Date
              </label>
              <div>
                <DatePicker
                  {...field}
                  value={field.value ? dayjs.utc(field.value).local() : null}
                  onChange={(newValue) => {
                    const utcValue = dayjs(newValue).utc().toISOString();
                    field.onChange(utcValue);
                  }}
                  format="YYYY/MM/DD HH:mm"
                />
                <ErrorMessage message={errors.startDate?.message} />
              </div>
            </>
          )}
        />
      </Box>
      <Box>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <>
              <label
                htmlFor="description-input"
                css={{ fontWeight: "bold", paddingBottom: "0.3rem" }}
              >
                End Date
              </label>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    value={field.value ? dayjs.utc(field.value).local() : null}
                    onChange={(newValue) => {
                      const utcValue = dayjs(newValue).utc().toISOString();
                      field.onChange(utcValue);
                    }}
                    format="YYYY/MM/DD HH:mm"
                  />
                </LocalizationProvider>
                <ErrorMessage message={errors.endDate?.message} />
              </div>
            </>
          )}
        />
      </Box>
    </Stack>
  );
};
