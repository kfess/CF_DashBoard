import dayjs from "dayjs";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

export const ContestDate: React.FC<Props> = ({ control, errors }) => {
  return (
    <>
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  {...field}
                  value={field.value ? dayjs.utc(field.value).local() : null} // without this line, error occurs
                  onChange={(newValue) => {
                    const utcValue = dayjs(newValue).utc().toISOString();
                    field.onChange(utcValue);
                  }}
                  format="YYYY/MM/DD HH:mm"
                  css={{ backgroundColor: "white" }}
                />
              </LocalizationProvider>
              <ErrorMessage message={errors.startDate?.message} />
            </div>
          </>
        )}
      />
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
                <DateTimePicker
                  {...field}
                  value={field.value ? dayjs.utc(field.value).local() : null} // without this line, error occurs
                  onChange={(newValue) => {
                    const utcValue = dayjs(newValue).utc().toISOString();
                    field.onChange(utcValue);
                  }}
                  format="YYYY/MM/DD HH:mm"
                  css={{ backgroundColor: "white" }}
                />
              </LocalizationProvider>
              <ErrorMessage message={errors.endDate?.message} />
            </div>
          </>
        )}
      />
    </>
  );
};
