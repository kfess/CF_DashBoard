import dayjs from "dayjs";
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@features/ui/component/ErrorMessage";
import { CreateCustomContest } from "@features/custom_contests/customContest";
import { DatePicker } from "@features/ui/component/DatePicker";
import { Select } from "@features/ui/component/Select";
import { TimeSelect } from "@features/ui/component/Select";

type Props = {
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
};

const DateTimePicker: React.FC<{
  label: string;
  name: "startDate" | "endDate";
  control: Control<CreateCustomContest>;
  errors: FieldErrors<CreateCustomContest>;
}> = ({ label, name, control, errors }) => {
  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Box
              component="label"
              display="block"
              htmlFor={`${name}-input`}
              fontWeight="bold"
              mb={0.5}
            >
              {label}
            </Box>
            <Stack direction="row" spacing={1} pt={0.5}>
              <Box flexGrow={2}>
                <DatePicker
                  {...field}
                  value={field.value ? dayjs(field.value).local() : null}
                  onChange={(newValue) =>
                    field.onChange(dayjs(newValue).toString())
                  }
                  format="YYYY/MM/DD"
                />
              </Box>
              <Box flexGrow={1}>
                <TimeSelect
                  label={label}
                  unit="hour"
                  step={1}
                  onChange={(value) => {
                    const currentDateTime = dayjs(field.value).local();
                    const updatedDateTime = currentDateTime.hour(value);
                    field.onChange(updatedDateTime.toISOString());
                  }}
                  defaultValue={dayjs(field.value).hour()}
                />
              </Box>
              <Box flexGrow={1}>
                <TimeSelect
                  label={label}
                  unit="minute"
                  step={5}
                  onChange={(value) => {
                    const currentDateTime = dayjs(field.value).local();
                    const updatedDateTime = currentDateTime.minute(value);
                    field.onChange(updatedDateTime.toISOString());
                  }}
                  defaultValue={dayjs(field.value).minute()}
                />
              </Box>
            </Stack>
          </>
        )}
      />
      {errors[name] && <ErrorMessage message={errors[name]?.message} />}
    </Box>
  );
};

export const ContestDate: React.FC<Props> = ({ control, errors }) => {
  return (
    <>
      <DateTimePicker
        label="Start Date"
        name="startDate"
        control={control}
        errors={errors}
      />
      <DateTimePicker
        label="End Date"
        name="endDate"
        control={control}
        errors={errors}
      />
    </>
  );
};
